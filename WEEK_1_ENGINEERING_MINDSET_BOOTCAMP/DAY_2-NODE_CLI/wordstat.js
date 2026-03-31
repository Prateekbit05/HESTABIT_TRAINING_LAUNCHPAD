#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");

const args = process.argv.slice(2);

function getArg(flag) {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
}

const filePath = getArg("--file");
const topN = Number(getArg("--top")) || 10;
const minLen = Number(getArg("--minLen")) || 1;
const concurrency = Number(getArg("--concurrency")) || 4;
const uniqueOnly = args.includes("--unique");

if (!filePath) {
  console.error(" Error: --file argument is required");
  process.exit(1);
}

const resolvedPath = path.resolve(filePath);

if (!fs.existsSync(resolvedPath)) {
  console.error(" Error: File does not exist");
  process.exit(1);
}

const startTime = process.hrtime.bigint();

const fileSize = fs.statSync(resolvedPath).size;
const chunkSize = Math.ceil(fileSize / concurrency);

function runWorker(start, end) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__dirname, "workers", "chunkWorker.js"),
      {
        workerData: { filePath: resolvedPath, start, end, minLen }
      }
    );

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function processFile() {
  const promises = [];

  for (let i = 0; i < concurrency; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, fileSize);
    promises.push(runWorker(start, end));
  }

  const results = await Promise.all(promises);

  let totalWords = 0;
  let longestWord = "";
  let shortestWord = null;
  const globalMap = {};

  for (const res of results) {
    totalWords += res.totalWords;

    if (res.longestWord.length > longestWord.length) {
      longestWord = res.longestWord;
    }

    if (!shortestWord || res.shortestWord.length < shortestWord.length) {
      shortestWord = res.shortestWord;
    }

    for (const [word, count] of Object.entries(res.wordMap)) {
      globalMap[word] = (globalMap[word] || 0) + count;
    }
  }

  const uniqueWords = Object.keys(globalMap).length;

  const topWords = Object.entries(globalMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));

  const result = {
    totalWords,
    uniqueWords: uniqueOnly ? uniqueWords : undefined,
    longestWord,
    shortestWord,
    topWords
  };

  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync("output/stats.json", JSON.stringify(result, null, 2));

  const endTime = process.hrtime.bigint();
  const durationMs = Number(endTime - startTime) / 1e6;

  fs.mkdirSync("logs", { recursive: true });

  const perfPath = path.join("logs", "perf-summary.json");

  let perfData = {
    concurrency_1: null,
    concurrency_4: null,
    concurrency_8: null,
    unit: "milliseconds",
    description: "Performance benchmark summary for wordstat CLI"
  };

  if (fs.existsSync(perfPath)) {
    perfData = JSON.parse(fs.readFileSync(perfPath, "utf8"));
  }

  perfData[`concurrency_${concurrency}`] = Math.round(durationMs);

  fs.writeFileSync(perfPath, JSON.stringify(perfData, null, 2));

  console.log(` Execution Time (${concurrency} workers): ${Math.round(durationMs)} ms`);
  console.log(" Statistics generated");
  console.log(" Output → output/stats.json");
}

processFile();

