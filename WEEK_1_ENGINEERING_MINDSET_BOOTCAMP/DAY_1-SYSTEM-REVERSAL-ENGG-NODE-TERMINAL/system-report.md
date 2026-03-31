# 📅 DAY 1 — SYSTEM REVERSE ENGINEERING + NODE MASTERING

## 🔹 Learning Outcomes
- Master terminal navigation and system inspection
- Deep understanding of PATH, environment variables, and the Node runtime
- Understanding memory management: Buffer vs. Streams

## 🔹 Tasks (NO GUI — Terminal Only)

### 1. System Identification
Document the following in your `system-report.md`:

- **OS Version**: `cat /etc/os-release` or `lsb_release -a`
- **Current Shell**: `echo $SHELL`
- **Node Binary Path**: `which node`
- **NPM Global Path**: `npm config get prefix`
- **PATH Inspection**: `echo $PATH | tr ':' '\n' | grep -iE "node|npm"`

### 2. Node Version Management (NVM)
Execute the following to manage your environment:
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM (or restart terminal)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Tasks
nvm install --lts
nvm install node # latest
nvm use --lts
nvm ls
```

### 3. System Introspection Script
Create `introspect.js`. Use the Node.js `os` module to retrieve system data.

### 4. Performance Benchmark: Stream vs. Buffer
**The Challenge**: Read a 50MB+ file and compare how Node.js handles the data in memory.

- **Buffer** (`fs.readFile`): Loads the entire file into RAM at once
- **Stream** (`fs.createReadStream`): Processes the file in small "chunks" (usually 64KB)

## 📦 Deliverables

| Deliverable | Format | Description |
|-------------|--------|-------------|
| `system-report.md` | Markdown | Document containing terminal outputs and OS details |
| `introspect.js` | JavaScript | Script using `require('os')` to log system specs |
| `logs/day1-perf.json` | JSON | Data showing Time (ms) and Memory (MB) for both methods |
| Git History | Commits | Minimum 6 meaningful commits (e.g., `feat: add introspection script`) |

## 🛠️ Code Snippet: introspect.js Starter
```javascript
const os = require('os');

console.log('--- SYSTEM INTROSPECTION ---');
console.log(`OS: ${os.type()} ${os.release()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPUs: ${os.cpus().length} cores`);
console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} hours`);
console.log(`User: ${os.userInfo().username}`);
console.log(`Node Path: ${process.execPath}`);
```
