const http = require("http");

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const path = myURL.pathname;
  const query = Object.fromEntries(myURL.searchParams);

  if (path === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running");
  }

  else if (path === "/echo") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.headers));
  }

  else if (path === "/slow") {
    const delay = parseInt(query.ms) || 1000;

    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Response delayed by ${delay} ms`);
    }, delay);
  }

  else if (path === "/cache") {
    let content = "Initial cached content";
    let etag = '"v1"';

    if (query.version === "2") {
      content = "UPDATED cached content";
      etag = '"v2"';
    }

    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304);
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Cache-Control": "max-age=3600",
        "ETag": etag
      });
      res.end(content);
    }
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
