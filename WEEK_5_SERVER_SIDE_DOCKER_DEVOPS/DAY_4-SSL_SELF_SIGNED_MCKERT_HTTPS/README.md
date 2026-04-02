# Week 5 — Day 4: SSL + Self-Signed Certs + mkcert + HTTPS

## 🎯 Objective
Set up HTTPS inside Docker using self-signed certificates generated with mkcert, configure NGINX for SSL termination, and force HTTP → HTTPS redirect.

---

## 📚 Topics Covered

- SSL/TLS fundamentals and certificate chain
- Generating self-signed certificates using `mkcert`
- Mounting certificates inside NGINX container
- HTTPS termination at NGINX layer
- Forcing HTTP → HTTPS redirect
- Verifying lock icon in browser with local domain

---

## 🧪 Exercise

Generated a self-signed SSL certificate using `mkcert` for a local domain, configured NGINX inside Docker to serve HTTPS on port 443, and forced all HTTP traffic to redirect to HTTPS. Verified the browser lock icon confirming a trusted local certificate.

---

## 📁 Folder Structure

```
DAY_4-SSL_SELF_SIGNED_MCKERT_HTTPS/
├── docker-compose.yml          # NGINX + app with SSL ports exposed
├── ssl-setup.md                # SSL setup and certificate documentation
└── SCREENSHOTS/
    ├── HTTP_SECURE_APPLICATION_CERTIFICATE.png
    ├── SCREENSHOT_1.png
    ├── SCREENSHOT_2.png
    ├── SCREENSHOT_3.png
    ├── SCREENSHOT_4.png
    ├── SCREENSHOT_5.png
    ├── SCREENSHOT_6.png
    └── SCREENSHOT_7.png
```

---

## 🔐 SSL Setup with mkcert

```bash
# Install mkcert
sudo apt install mkcert
mkcert -install          # Install local CA

# Generate cert for local domain
mkcert localhost 127.0.0.1 myapp.local

# Output files:
# localhost+2.pem       → certificate
# localhost+2-key.pem   → private key
```

---

## ⚙️ NGINX SSL Configuration

```nginx
# Redirect HTTP → HTTPS
server {
  listen 80;
  server_name myapp.local;
  return 301 https://$host$request_uri;
}

# HTTPS server
server {
  listen 443 ssl;
  server_name myapp.local;

  ssl_certificate     /etc/nginx/certs/localhost+2.pem;
  ssl_certificate_key /etc/nginx/certs/localhost+2-key.pem;

  location / {
    proxy_pass http://app:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

---

## 🐳 docker-compose.yml Overview

```yaml
version: "3.8"
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - app

  app:
    build: ./server
    expose:
      - "3000"
```

---

## 📸 Screenshots

### 🔒 HTTPS Secure Application Certificate
![HTTP Secure Application Certificate](./SCREENSHOTS/HTTP_SECURE_APPLICATION_CERTIFICATE.png)

### Screenshot 1
![Screenshot 1](./SCREENSHOTS/SCREENSHOT_1.png)

### Screenshot 2
![Screenshot 2](./SCREENSHOTS/SCREENSHOT_2.png)

### Screenshot 3
![Screenshot 3](./SCREENSHOTS/SCREENSHOT_3.png)

### Screenshot 4
![Screenshot 4](./SCREENSHOTS/SCREENSHOT_4.png)

### Screenshot 5
![Screenshot 5](./SCREENSHOTS/SCREENSHOT_5.png)

### Screenshot 6
![Screenshot 6](./SCREENSHOTS/SCREENSHOT_6.png)

### Screenshot 7
![Screenshot 7](./SCREENSHOTS/SCREENSHOT_7.png)

---

## ✅ Deliverables

- [x] Self-signed certificate generated using `mkcert`
- [x] `docker-compose.yml` — NGINX with ports 80 and 443 exposed
- [x] NGINX configured for SSL termination on port 443
- [x] HTTP → HTTPS redirect enforced
- [x] `ssl-setup.md` — Full SSL setup documentation
- [x] Browser lock icon confirmed with local domain
- [x] 8 screenshots including HTTPS certificate proof

---

## 💡 Key Learnings

- **mkcert:** Creates locally-trusted certificates — browser shows a green lock without security warnings, unlike raw `openssl` self-signed certs
- **SSL termination at NGINX:** Backend app stays plain HTTP internally — NGINX handles all encryption/decryption at the edge
- **HTTP → HTTPS redirect:** `return 301 https://$host$request_uri` ensures all traffic is always encrypted
- **Certificate mounting:** Certs are mounted into the NGINX container via a volume — no need to rebuild the image when certs change
- **Port 443:** Standard HTTPS port — must be exposed in both Docker and NGINX config

