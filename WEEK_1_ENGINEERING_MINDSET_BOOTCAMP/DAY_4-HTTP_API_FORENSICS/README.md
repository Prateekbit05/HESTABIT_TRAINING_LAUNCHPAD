# 📡 DAY 4 — HTTP / API FORENSICS

## 🔹 Overview
This module covers deep inspection of the HTTP request-response cycle using `curl`, Postman, and a custom Node.js server. Tasks include DNS forensics, pagination analysis, header manipulation, ETag caching, and building API endpoints.

---

## 🔹 Learning Outcomes
- Understand HTTP headers and their role in requests/responses
- Implement and verify ETag-based caching (304 Not Modified)
- Analyze pagination patterns in REST APIs
- Build a Node.js HTTP server with custom endpoints
- Perform DNS lookup and traceroute analysis

---

## 🔹 Folder Structure

```
DAY_4-HTTP_API_FORENSICS/
├── dns-traceroute.js        # DNS lookup and traceroute script
├── fetch-products.js        # Fetch paginated products from dummyjson.com
├── fetch-headers.js         # Inspect and modify request headers
├── etag-caching.js          # ETag caching implementation
├── etag-caching.js_1        # ETag caching alternate version
├── server.js                # Node HTTP server with /echo, /slow, /cache
├── curl-lab.txt             # All curl requests and responses
├── api-investigation.md     # Full analysis report
├── package.json             # Node project config
└── README.md                # This file
```

---

## 🔹 Tasks

### 1. DNS Lookup & Traceroute
```bash
nslookup dummyjson.com
traceroute dummyjson.com
node dns-traceroute.js
```

### 2. Paginated API Request via curl
```bash
curl -v "https://dummyjson.com/products?limit=5&skip=10"
```

### 3. Header Modification
```bash
# Remove User-Agent
curl -v -H "User-Agent:" "https://dummyjson.com/products/1"

# Send fake Authorization header
curl -v -H "Authorization: Bearer fake-token-12345" "https://dummyjson.com/products/1"
```

### 4. ETag Caching
```bash
# Step 1: Get ETag
curl -v "https://dummyjson.com/products/1"

# Step 2: Re-send with If-None-Match
curl -v -H 'If-None-Match: "<etag-value>"' "https://dummyjson.com/products/1"
# Expected: 304 Not Modified
```

### 5. Node HTTP Server
```bash
node server.js
```

| Endpoint | Description |
|----------|-------------|
| `GET /echo` | Returns all incoming request headers as JSON |
| `GET /slow?ms=3000` | Delays response by query param milliseconds |
| `GET /cache` | Returns Cache-Control and ETag response headers |

---

## 🔹 Postman Tests

| Request | Method | URL |
|---------|--------|-----|
| Paginated products | GET | `https://dummyjson.com/products?limit=5&skip=10` |
| No User-Agent | GET | `https://dummyjson.com/products/1` |
| Fake Auth header | GET | `https://dummyjson.com/products/1` |
| ETag first request | GET | `https://dummyjson.com/products/1` |
| ETag 304 check | GET | `https://dummyjson.com/products/1` |
| Echo endpoint | GET | `http://localhost:3000/echo` |
| Slow endpoint | GET | `http://localhost:3000/slow?ms=3000` |
| Cache endpoint | GET | `http://localhost:3000/cache` |

---

## 🔹 Deliverables

| Deliverable | Format | Status |
|-------------|--------|--------|
| `curl-lab.txt` | Text | ✅ Done |
| `api-investigation.md` | Markdown | ✅ Done |
| `server.js` | JavaScript | ✅ Done |
| Postman screenshots | PNG | ✅ Done |

---

## 🔹 Key Takeaways

1. **Pagination** — Offset-based using `limit` + `skip` params
2. **Headers** — Production APIs enforce strict header validation
3. **ETag Caching** — `304 Not Modified` saves bandwidth when content is unchanged
4. **DNS** — Cloudflare CDN resolves `dummyjson.com` to multiple IPs for load balancing
5. **Request-Response Cycle** — Every HTTP call involves header negotiation, status codes and body
