const fs = require("fs");
const path = require("path");
const { randomInt } = require("crypto");

const OUTPUT_FILE = path.join(__dirname, "..", "corpus.txt");
const WORD_COUNT = 210000;

function randomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  // Fixed: crypto.randomInt instead of Math.random (cryptographically safe)
  const len = randomInt(3, 11); // 3 to 10 inclusive
  let word = "";
  for (let i = 0; i < len; i++) {
    word += letters[randomInt(0, letters.length)];
  }
  return word;
}

let words = [];

for (let i = 0; i < WORD_COUNT; i++) {
  words.push(randomWord());
}

fs.writeFileSync(OUTPUT_FILE, words.join(" "), "utf8");

console.log(`✅ corpus.txt generated with ${WORD_COUNT} words`);
