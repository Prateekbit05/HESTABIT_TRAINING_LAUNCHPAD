const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "..", "corpus.txt");
const WORD_COUNT = 210000;

function randomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const len = Math.floor(Math.random() * 8) + 3;
  let word = "";
  for (let i = 0; i < len; i++) {
    word += letters[Math.floor(Math.random() * letters.length)];
  }
  return word;
}

let words = [];

for (let i = 0; i < WORD_COUNT; i++) {
  words.push(randomWord());
}

fs.writeFileSync(OUTPUT_FILE, words.join(" "), "utf8");

console.log(`✅ corpus.txt generated with ${WORD_COUNT} words`);
