# Internship Launchpad: Developers 2025–26

## WEEK 1 — ENGINEERING MINDSET BOOTCAMP

### Objective
The goal of this week is to transition from a "coder" to an **engineer**. You will focus on research, debugging, performance measurement, documentation, and disciplined delivery.

---

##  DAY 1 — System Reverse Engineering & Terminal Mastery

### Learning Outcomes
* Master terminal navigation and system inspection.
* Deep understanding of `PATH`, environment variables, and the Node.js runtime.

### Tasks (NO GUI — Terminal Only)
1.  **System Documentation:** Identify and document OS version, Shell type, Node binary path, and NPM global paths.
2.  **Node Version Management:** Install **NVM**, install multiple Node versions, and demonstrate switching between LTS and Latest.
3.  **Introspection Script:** Create `introspect.js` to extract system metadata (CPU, Memory, Uptime) using the Node `os` module.
4.  **Performance Benchmark (Stream vs. Buffer):**
    * Generate a 50MB+ file.
    * Compare `fs.readFile` vs. `fs.createReadStream`.
    * Measure execution time and peak memory usage.

### Deliverables
* `system-report.md` — Detailed system documentation.
* `introspect.js` — System inspection script.
* `logs/day1-perf.json` — Performance metrics.
* **Minimum 6 meaningful commits.**

---

## DAY 2 — Node CLI & Large Data Processing

### Learning Outcomes
* Asynchronous programming patterns.
* Building professional CLI tools.
* Concurrency and performance optimization.

### Tasks
1.  **Data Generation:** Create a corpus file containing **200,000+ words**.
2.  **Build `wordstat.js`:** A CLI tool that accepts flags:
    ```bash
    node wordstat.js --file corpus.txt --top 10 --minLen 5 --unique
    ```
3.  **Concurrency Implementation:** * Implement chunk-based processing.
    * Compare performance using `Promise.all` vs. `worker_threads`.
    * Benchmark across 1, 4, and 8 threads.

### Deliverables
* `wordstat.js` — Functioning CLI tool.
* `output/stats.json` — Final word statistics.
* `logs/perf-summary.json` — Performance comparison report.
* **Minimum 8 commits.**

---

## DAY 3 — Git Mastery & Version Control Forensics

### Learning Outcomes
* Recovering from mistakes (Undo/Redo).
* Advanced Git workflows and conflict resolution.

### Tasks
1.  **Bug Hunting:** Create a repo with 8+ commits; introduce a bug in commit #4.
2.  **Git Bisect:** Use `git bisect` to programmatically find the faulty commit.
3.  **Correction:** Fix the bug and use `git revert` (preserving history) instead of `reset`.
4.  **Stash Workflow:** Practice `stash` -> `pull` -> `apply` to handle mid-work updates.
5.  **Conflict Simulation:** Manually trigger and resolve a merge conflict using two local clones.

### Deliverables
* `bisect-session.txt` — Terminal log of the search.
* `stash-session.txt` — Log of stash workflow.
* `MERGE-POSTMORTEM.md` — Analysis of the conflict resolution.
* **Commit Graph** showing branches and merges.

---

## DAY 4 — HTTP / API Forensics

### Learning Outcomes
* Request-response lifecycle.
* Header manipulation and ETag caching.

### Tasks
1.  **Network Pathing:** Use `nslookup` and `traceroute` on `dummyjson.com`.
2.  **CURL Forensics:** * Fetch products with specific limits/skips using `-v`.
    * Modify headers (User-Agent, Auth).
    * Test Caching using `If-None-Match`.
3.  **Mini-Server:** Build a Node.js server with:
    * `/echo`: Returns request headers.
    * `/slow`: Artificial 3s delay.
    * `/cache`: Implements cache headers.

### Deliverables
* `curl-lab.txt` — Detailed request/response logs.
* `api-investigation.md` — Technical analysis of the API.
* `server.js` — The Node.js forensic server.
* **Postman Screenshots** of successful header/cache tests.

---

## DAY 5 — Automation & Mini-CI Pipeline

### Learning Outcomes
* Automation mindset and commit safeguards.
* Building and scheduling artifacts.

### Tasks
1.  **Scripting:** Create `validate.sh` to check directory structure and config file validity.
2.  **Linting & Formatting:** Integrate ESLint & Prettier.
3.  **Git Hooks:** Set up **Husky** to run linting/validation on `pre-commit`.
4.  **Build Process:** * Automate creation of a `.tgz` artifact with a timestamp.
    * Generate a SHA checksum for the build.
5.  **Scheduling:** Schedule a script execution using `cron` (Linux/Mac) or Task Scheduler (Windows).

### Deliverables
* `validate.sh` — The automation script.
* `.eslintrc` & `.prettierrc` configs.
* `artifacts/build-*.tgz` — A sample build artifact.
* `WEEK1-RETRO.md` — Personal reflections on the week.

---

## Completion Criteria
* [ ] All deliverables submitted in the correct directory.
* [ ] Commit history is clean, atomic, and meaningful.
* [ ] Performance metrics are accurately documented in JSON/Markdown.
* [ ] The **Engineering Mindset** (attention to detail, documentation) is evident throughout the repo.
