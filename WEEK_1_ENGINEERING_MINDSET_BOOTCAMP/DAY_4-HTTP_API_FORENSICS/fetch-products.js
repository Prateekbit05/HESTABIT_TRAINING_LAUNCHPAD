const fetch = require("node-fetch");

const url = "https://dummyjson.com/products?limit=5&skip=10";

async function run() {
  const res = await fetch(url);

  console.log("Status Code:", res.status);
  console.log("Response Headers:", res.headers.raw());

  const data = await res.json();
  console.log("Response Body:", data);
}

run();
