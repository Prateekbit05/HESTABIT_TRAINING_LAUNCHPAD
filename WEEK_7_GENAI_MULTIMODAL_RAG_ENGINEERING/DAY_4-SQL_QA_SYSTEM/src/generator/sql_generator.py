import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from pathlib import Path
import yaml
from typing import Dict, Optional
import re
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from src.utils.schema_loader import SchemaLoader

_MAX_REGEX_INPUT = 4_000

class SQLGenerator:
    """Generate SQL queries from natural language using LLM"""

    def __init__(self, config_path: str = 'src/config/config.yaml'):
        with open(config_path) as f:
            self.config = yaml.safe_load(f)

        llm_config = self.config['llm']
        sql_config = self.config['sql_generation']

        print(f"🤖 Loading LLM: {llm_config['model_name']}...")

        self.tokenizer = AutoTokenizer.from_pretrained(llm_config['model_name'])
        self.model = AutoModelForCausalLM.from_pretrained(
            llm_config['model_name'],
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map=llm_config['device']
        )

        self.pipe = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            max_new_tokens=llm_config['max_new_tokens'],
            temperature=llm_config['temperature'],
            do_sample=llm_config['do_sample']
        )

        self.schema_loader = SchemaLoader(config_path)
        self.max_retries = sql_config['max_retries']
        self.include_schema = sql_config['include_schema']

        print("✅ SQL Generator ready!")

    # ------------------------------------------------------------------ #
    #  Prompt building                                                     #
    # ------------------------------------------------------------------ #

    def _build_prompt(self, question: str) -> str:
        """Build a short, strict prompt that discourages LLM verbosity."""
        tables = self.schema_loader.get_tables()

        schema_context = ""
        if self.include_schema:
            schema_context = "AVAILABLE TABLES:\n\n"
            for table in tables:
                columns = self.schema_loader.get_columns(table)
                col_names = [col['name'] for col in columns]
                schema_context += f"{table}: {', '.join(col_names)}\n"

        return f"""Generate ONLY a SQL SELECT query. No explanations.
{schema_context}
Question: {question}
SQL:"""

    # ------------------------------------------------------------------ #
    #  Public interface                                                    #
    # ------------------------------------------------------------------ #

    def generate(self, question: str) -> Dict:
        """Generate SQL query from a natural-language question."""
        try:
            prompt = self._build_prompt(question)
            outputs = self.pipe(prompt)
            generated_text = outputs[0]['generated_text']
            sql = self._extract_clean_sql(generated_text, prompt)

            if not sql:
                return {'success': False, 'sql': None, 'error': 'Failed to extract valid SQL'}

            return {'success': True, 'sql': sql, 'error': None}

        except Exception as e:
            return {'success': False, 'sql': None, 'error': str(e)}

    def generate_with_retry(self, question: str) -> Dict:
        """Generate SQL with retry logic, discarding outputs that still contain explanation text."""
        result: Dict = {'success': False, 'sql': None, 'error': 'No attempts made'}

        for attempt in range(self.max_retries):
            result = self.generate(question)

            if result['success']:
                sql = result['sql']
                if any(word in sql for word in ['Explanation', 'Example', 'Output', 'Expected']):
                    print(f"⚠️  Attempt {attempt + 1}: SQL contains explanation text, retrying...")
                    continue
                result['attempt'] = attempt + 1
                return result

            print(f"⚠️  Attempt {attempt + 1} failed: {result['error']}")

        result['attempt'] = self.max_retries
        return result

    # ------------------------------------------------------------------ #
    #  SQL extraction                                                      #
    # ------------------------------------------------------------------ #

    def _extract_clean_sql(self, generated_text: str, prompt: str) -> Optional[str]:
        """
        Extract only the SQL query from LLM output, stripping preamble and
        any trailing explanation text.

        Two-layer ReDoS defence
        ───────────────────────
        Layer 1 — hard cap: truncate to _MAX_REGEX_INPUT chars before any
                  regex runs.  Even a theoretically safe pattern can be slow
                  on a 500 KB LLM dump; this bounds the worst case absolutely.

        Layer 2 — single unambiguous class: _SELECT_RE uses SELECT[^;]+;
                  instead of SELECT\s+[^;]+;.  Keeping \s+ as a separate
                  quantifier ahead of [^;]+ creates overlap (whitespace
                  matches both), allowing the engine to retry every split
                  on inputs that lack a semicolon — polynomial backtracking.
                  Merging into one class removes all ambiguity.
        """
        # Strip echoed prompt so we only inspect newly generated tokens
        if prompt in generated_text:
            sql_part = generated_text.split(prompt)[-1]
        else:
            sql_part = generated_text

        sql_part = sql_part.strip()

        # Layer 1 — hard cap
        sql_part = sql_part[:_MAX_REGEX_INPUT]

        # ── Method 1: compiled, ReDoS-safe regex ─────────────────────────
        select_match = _SELECT_RE.search(sql_part)

        if select_match:
            sql = select_match.group(1)

            # Keep only the first statement
            if ';' in sql:
                sql = sql.split(';')[0] + ';'

            # Strip explanation text that crept in before the semicolon
            for separator in ['\n\n', 'Explanation:', 'Example:', 'Output:', 'Question:', '  ']:
                if separator in sql:
                    sql = sql.split(separator)[0].strip()
                    if not sql.endswith(';'):
                        sql += ';'

            return self._clean_sql(sql)

        # ── Method 2: line-by-line fallback (zero regex risk) ────────────
        sql_lines = []
        for line in sql_part.split('\n'):
            line = line.strip()

            if any(kw in line for kw in ['Explanation:', 'Example:', 'Output:', 'Question:', 'Expected']):
                break

            if 'SELECT' in line.upper() or sql_lines:
                sql_lines.append(line)
                if ';' in line:
                    break

        if sql_lines:
            sql = self._clean_sql(' '.join(sql_lines))
            if not sql.endswith(';'):
                sql += ';'
            return sql

        return None

    # ------------------------------------------------------------------ #
    #  SQL cleaning                                                        #
    # ------------------------------------------------------------------ #

    def _clean_sql(self, sql: str) -> str:
        """Normalise whitespace, strip comments, ensure single trailing semicolon."""
        sql = re.sub(r'\s+', ' ', sql)          # collapse whitespace
        sql = re.sub(r'--[^\n]*', '', sql)       # strip inline comments (safe: [^\n]* can't backtrack past \n)
        sql = sql.rstrip(';').strip() + ';'
        # Keep only the first statement
        if sql.count(';') > 1:
            sql = sql.split(';')[0] + ';'
        return sql.strip()


# ------------------------------------------------------------------ #
#  Smoke test                                                          #
# ------------------------------------------------------------------ #

if __name__ == "__main__":
    print("Testing SQL Generator...\n")

    generator = SQLGenerator()

    test_questions = [
        "Show all artists",
        "Count rows in artists",
        "Show first 5 rows from artists",
    ]

    for question in test_questions:
        print(f"\n❓ Question: {question}")
        result = generator.generate(question)

        if result['success']:
            print(f"✅ SQL: {result['sql']}")
        else:
            print(f"❌ Error: {result['error']}")
