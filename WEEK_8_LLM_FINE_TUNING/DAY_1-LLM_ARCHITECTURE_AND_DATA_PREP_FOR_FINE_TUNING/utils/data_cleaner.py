import pandas as pd
import json
import jsonlines
import secrets
import random
from tqdm import tqdm
import os


class InstructionDatasetBuilder:
    """
    Build instruction tuning dataset from customers and people CSV files
    Includes: QA, Reasoning, Extraction tasks
    """

    def __init__(self, customers_path: str, people_path: str):
        print("📂 Loading datasets...")

        if not os.path.exists(customers_path):
            raise FileNotFoundError(f"❌ File not found: {customers_path}")
        if not os.path.exists(people_path):
            raise FileNotFoundError(f"❌ File not found: {people_path}")

        self.customers = pd.read_csv(customers_path).dropna()
        self.people = pd.read_csv(people_path).dropna()

        print(f"✅ Loaded {len(self.customers)} customers")
        print(f"✅ Loaded {len(self.people)} people")

        print(f"\n📋 Customer columns: {list(self.customers.columns)}")
        print(f"📋 People columns: {list(self.people.columns)}")

        self.instructions = []

    # ========== QA ==========
    def generate_qa_samples(self, n_samples: int = 500):
        print("\n🔹 Generating QA samples...")
        samples = []

        question_starters = [
            ("What is", "is"),
            ("Can you tell me", "is"),
            ("I need to know", "is"),
            ("Please provide", "is"),
            ("Could you share", "is"),
            ("Who is", "is"),
            ("Where is", "is located in"),
            ("How can I contact", "can be contacted at"),
            ("Which company does", "works for"),
            ("Do you have", "Yes, it is"),
        ]

        for _ in tqdm(range(n_samples)):
            row = self.customers.sample(1).iloc[0] if secrets.randbelow(2) else self.people.sample(1).iloc[0]

            cols = row.index.tolist()
            name_col = next((c for c in cols if 'name' in c.lower()), cols[0])

            qa_type = secrets.choice(['email', 'phone', 'location', 'company', 'age', 'job'])
            starter, verb = secrets.choice(question_starters)

            try:
                if qa_type == 'email' and any('email' in c.lower() for c in cols):
                    email_col = next(c for c in cols if 'email' in c.lower())
                    q = f"{starter} the email for {row[name_col]}?"
                    a = f"The email {verb} {row[email_col]}."

                elif qa_type == 'phone' and any('phone' in c.lower() for c in cols):
                    phone_col = next(c for c in cols if 'phone' in c.lower())
                    q = f"{starter} {row[name_col]}'s phone number?"
                    a = f"The phone number {verb} {row[phone_col]}."

                elif qa_type == 'location':
                    city_col = next((c for c in cols if 'city' in c.lower()), None)
                    country_col = next((c for c in cols if 'country' in c.lower()), None)

                    if city_col and country_col:
                        q = f"{starter} where {row[name_col]} is based?"
                        a = f"{row[name_col]} {verb} {row[city_col]}, {row[country_col]}."
                    else:
                        continue

                elif qa_type == 'company' and any('company' in c.lower() for c in cols):
                    company_col = next(c for c in cols if 'company' in c.lower())
                    q = f"{starter} which organization {row[name_col]} represents?"
                    a = f"{row[name_col]} represents {row[company_col]}."

                elif qa_type == 'age' and any('age' in c.lower() for c in cols):
                    age_col = next(c for c in cols if 'age' in c.lower())
                    q = f"{starter} the age of {row[name_col]}?"
                    a = f"{row[name_col]} {verb} {row[age_col]} years old."

                elif qa_type == 'job' and any('job' in c.lower() or 'title' in c.lower() for c in cols):
                    job_col = next(c for c in cols if 'job' in c.lower() or 'title' in c.lower())
                    q = f"{starter} {row[name_col]}'s role?"
                    a = f"Their role {verb} {row[job_col]}."

                else:
                    continue

                samples.append({"instruction": q, "input": "", "output": a})

            except Exception:
                continue

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} QA samples")

    # ========== REASONING ==========
    def generate_reasoning_samples(self, n_samples: int = 500):
        print("\n🔹 Generating Reasoning samples...")
        samples = []

        for _ in tqdm(range(n_samples)):
            row = self.customers.sample(1).iloc[0] if secrets.randbelow(2) else self.people.sample(1).iloc[0]
            cols = row.index.tolist()
            name_col = next((c for c in cols if 'name' in c.lower()), cols[0])

            try:
                instruction = f"Provide insights about {row[name_col]}."
                output = f"{row[name_col]} appears to be a professional suitable for business engagement."

                samples.append({"instruction": instruction, "input": "", "output": output})

            except Exception:
                continue

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} Reasoning samples")

    # ========== EXTRACTION ==========
    def generate_extraction_samples(self, n_samples: int = 500):
        print("\n🔹 Generating Extraction samples...")
        samples = []

        for _ in tqdm(range(n_samples)):
            row = self.customers.sample(1).iloc[0] if secrets.randbelow(2) else self.people.sample(1).iloc[0]
            cols = row.index.tolist()
            name_col = next((c for c in cols if 'name' in c.lower()), cols[0])

            text = f"{row[name_col]} is a professional."
            instruction = "Extract the name from the text."
            output = json.dumps({"name": row[name_col]}, indent=2)

            samples.append({
                "instruction": instruction,
                "input": text,
                "output": output
            })

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} Extraction samples")

    # ========== CLEAN ==========
    def clean_and_validate(self):
        print("\n🧹 Cleaning dataset...")
        initial_count = len(self.instructions)

        self.instructions = [s for s in self.instructions if s['output'].strip()]

        seen = set()
        cleaned = []

        for sample in self.instructions:
            key = (sample['instruction'], sample['output'])
            if key not in seen:
                seen.add(key)
                cleaned.append(sample)

        self.instructions = cleaned
        print(f"✅ Cleaned: {initial_count} → {len(self.instructions)} samples")

    # ========== SAVE ==========
    def save_datasets(self, train_ratio=0.8):
        print("\n💾 Saving datasets...")
        
        rng = random.Random(42)
        rng.shuffle(self.instructions)

        split_idx = int(len(self.instructions) * train_ratio)

        train_data = self.instructions[:split_idx]
        val_data = self.instructions[split_idx:]

        os.makedirs('data', exist_ok=True)

        with jsonlines.open('data/train.jsonl', 'w') as f:
            f.write_all(train_data)

        with jsonlines.open('data/val.jsonl', 'w') as f:
            f.write_all(val_data)

        print(f"✅ Train: {len(train_data)} samples")
        print(f"✅ Val: {len(val_data)} samples")

        return train_data, val_data


# ========== MAIN ==========
if __name__ == "__main__":
    builder = InstructionDatasetBuilder(
        customers_path='data/customers-100000.csv',
        people_path='data/people-100000.csv'
    )

    builder.generate_qa_samples(500)
    builder.generate_reasoning_samples(500)
    builder.generate_extraction_samples(500)

    builder.clean_and_validate()

    train_data, val_data = builder.save_datasets()

    print("\n" + "=" * 50)
    print("✅ DATASET CREATION COMPLETE")
    print("=" * 50)
    print(f"📊 Train: {len(train_data)}")
    print(f"📊 Val: {len(val_data)}")
    print(f"📊 Total: {len(train_data) + len(val_data)}")
