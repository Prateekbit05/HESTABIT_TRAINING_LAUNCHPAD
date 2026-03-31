const fetch = require("node-fetch");

async function run() {
  const baseUrl = "https://dummyjson.com/products/1";

  const res1 = await fetch(baseUrl);
  const etag = res1.headers.get("etag");
  console.log("ETag received:", etag);

  const modifiedUrl = baseUrl + "?t=" + Date.now();

  const res2 = await fetch(modifiedUrl, {
    headers: {
      "If-None-Match": etag
    }
  });

  console.log("Second request status:", res2.status);

  const data = await res2.json();
  console.log("Modified response received");
  console.log(data);
}

run();
