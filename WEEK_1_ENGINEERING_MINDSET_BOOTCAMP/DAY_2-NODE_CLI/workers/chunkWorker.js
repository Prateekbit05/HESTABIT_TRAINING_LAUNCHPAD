const fs = require("fs");
const { parentPort, workerData } = require("worker_threads");

const { filePath, start, end, minLen } = workerData;

const stream = fs.createReadStream(filePath, {
  start,
  end,
  encoding: "utf8"
});

let text = "";

stream.on("data", chunk => {
  text += chunk;
});

stream.on("end", () => {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= minLen && w.length > 0);

  const wordMap = {};
  let longestWord = "";
  let shortestWord = null;

  for (const word of words) {
    wordMap[word] = (wordMap[word] || 0) + 1;

    if (word.length > longestWord.length) longestWord = word;
    if (!shortestWord || word.length < shortestWord.length)
      shortestWord = word;
  }

  parentPort.postMessage({
    totalWords: words.length,
    wordMap,
    longestWord,
    shortestWord
  });
});


