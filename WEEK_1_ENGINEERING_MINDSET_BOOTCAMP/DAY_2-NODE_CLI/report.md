# DAY 2 — NODE CLI APP + CONCURRENCY + LARGE DATA PROCESSING

## 🔹 Learning Outcomes
* Understanding asynchronous I/O in Node.js
* Building production-grade CLI tools
* Processing large files efficiently
* Implementing concurrency using worker_threads
* Measuring and analyzing performance and speedup

## 🔹 Core Concepts Covered
* CLI argument parsing
* Stream-based file reading
* Chunk-based data processing
* Parallel execution using worker threads
* Performance benchmarking & speedup analysis

## 🔹 Tasks (TERMINAL ONLY — NO GUI)

### Large Corpus Generation
Generate a large text file (200,000+ words) to simulate real-world data processing.

**Purpose**: To test memory usage, performance, and scalability.

**Example Command**:
```bash
node scripts/generateCorpus.js
```

**Result**:
```
corpus.txt (200k+ words)
```

### Build Node.js CLI Tool (`wordstat.js`)
Create a CLI tool that accepts command-line arguments and processes a large text file.

**CLI Command Format**:
```bash
node wordstat.js --file corpus.txt --top 10 --minLen 5 --unique --concurrency 4
```

**Supported Flags**:

| Flag | Description |
|------|-------------|
| `--file` | Input text file |
| `--top` | Top N repeated words |
| `--minLen` | Minimum word length |
| `--unique` | Count unique words |
| `--concurrency` | Number of worker threads |

### CLI Output Requirements
The CLI must compute and output:
* Total number of words
* Unique words count (optional)
* Longest word
* Shortest word
* Top N most frequent words

**Output File**:
```
output/stats.json
```

### Stream-Based File Reading
Instead of loading the entire file into memory:
* Use `fs.createReadStream`
* Read data in small chunks
* Reduce RAM usage

**Why Streams?**
* Memory efficient
* Suitable for very large files
* Non-blocking I/O

### Chunk-Based Processing
Divide the file into byte-based chunks:
```
File Size
   ↓
Split into N chunks
   ↓
Each chunk assigned to one worker
```

**Purpose**:
* Enable parallel processing
* Reduce execution time

### Concurrency with `worker_threads`
Spawn multiple workers using Node.js `worker_threads`:
* Each worker processes a file chunk
* Workers run in parallel on different CPU cores
* Partial results are sent back to the main thread

**Concurrency Levels Tested**:
* 1 worker (baseline)
* 4 workers
* 8 workers

### Merging Partial Results
The main thread:
* Collects results from all workers
* Merges word maps
* Calculates global statistics

### Performance Benchmarking
Execution time is measured using:
```javascript
process.hrtime.bigint()
```

**Benchmark Data Stored In**:
```
logs/perf-summary.json
```

**Metrics Captured**:
* Execution time (milliseconds)
* Concurrency level
* Baseline vs parallel performance

### Speedup Analysis
**Speedup Formula**:
```
Speedup = T₁ / Tₙ
```

**Where**:
* `T₁` = Time with 1 worker
* `Tₙ` = Time with N workers

**Observation**:
* Significant improvement from 1 → 4 workers
* Diminishing returns at higher concurrency
* Demonstrates Amdahl's Law

## Deliverables

| Deliverable | Format | Description |
|-------------|--------|-------------|
| `wordstat.js` | Executable JS | Main CLI tool |
| `workers/chunkWorker.js` | JavaScript | Worker thread logic |
| `output/stats.json` | JSON | Final computed statistics |
| `logs/perf-summary.json` | JSON | Performance benchmark results |
| Git History | Commits | Minimum 8 meaningful commits |

## Execution Commands
```bash
node wordstat.js --file corpus.txt --concurrency 1
node wordstat.js --file corpus.txt --concurrency 4
node wordstat.js --file corpus.txt --concurrency 8 --top 10 --minLen 5 --unique
```

## High-Level Execution Flow
```
User CLI Command
      ↓
Argument Parsing & Validation
      ↓
File Chunking Logic
      ↓
Worker Threads Spawned
      ↓
Stream-Based Chunk Processing
      ↓
Partial Results Returned
      ↓
Global Merge & Aggregation
      ↓
Final JSON Output + Performance Logs
```

## Key Learnings
* Streams are essential for large-file handling
* Node.js supports real parallelism via worker_threads
* Chunking improves scalability
* Benchmarking validates architectural decisions
* Concurrency improves performance but has limits

## Status
-  CLI Tool Built
-  Large Data Supported
-  Stream Processing Implemented
-  Worker Thread Concurrency Enabled
-  Performance Benchmarked
-  Speedup Analyzed
