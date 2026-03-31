const fs = require("fs");

const startTime = process.hrtime.bigint();
const startMemory = process.memoryUsage().rss;

fs.readFile("largefile.bin", (err) => {
  if (err) throw err;

  const endTime = process.hrtime.bigint();
  const endMemory = process.memoryUsage().rss;

  console.log("BUFFER READ RESULTS");
  console.log("Time (ms):", Number(endTime - startTime) / 1e6);
  console.log("Memory Used (MB):", (endMemory - startMemory) / 1024 / 1024);
});
