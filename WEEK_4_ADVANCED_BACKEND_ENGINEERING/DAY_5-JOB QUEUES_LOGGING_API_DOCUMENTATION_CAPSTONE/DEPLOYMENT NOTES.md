# DEPLOYMENT-NOTES.md 

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Redis Configuration](#redis-configuration)
5. [PM2 Setup](#pm2-setup)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL/TLS Setup](#ssltls-setup)
8. [Monitoring & Logging](#monitoring--logging)
9. [Deployment Process](#deployment-process)
10. [Post-Deployment Verification](#post-deployment-verification)
11. [Rollback Procedure](#rollback-procedure)
12. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code Review 
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Security audit completed
- [ ] Dependencies updated
- [ ] No console.logs in production code
- [ ] Environment variables documented

### Infrastructure 
- [ ] Production server provisioned
- [ ] Domain name configured
- [ ] SSL certificate obtained
- [ ] MongoDB cluster ready
- [ ] Redis instance running
- [ ] Backup strategy in place

### Configuration 
- [ ] `.env.prod` file created
- [ ] Strong JWT secret generated
- [ ] Database credentials secured
- [ ] CORS origins configured
- [ ] Rate limits adjusted
- [ ] Log rotation configured

### Security ✅
- [ ] HTTPS enforced
- [ ] Security headers enabled
- [ ] Firewall rules configured
- [ ] SSH keys configured
- [ ] Sudo access restricted
- [ ] Automated backups enabled

---

## Environment Setup

### Server Requirements

**Minimum Specifications**:
- **OS**: Ubuntu 22.04 LTS or newer
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 50 GB SSD
- **Network**: 100 Mbps

**Recommended Specifications**:
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Storage**: 100+ GB SSD
- **Network**: 1 Gbps

---

### Install Node.js

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18.x.x
npm --version   # Should be 9.x.x
```

---

### Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

# Verify installation
pm2 --version
```

---

### Install MongoDB Tools

```bash
# MongoDB Shell (mongosh)
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-mongosh

# Verify
mongosh --version
```

---

### Install Redis (if self-hosting)

```bash
# Install Redis
sudo apt-get install -y redis-server

# Configure Redis
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Verify
redis-cli ping  # Should return PONG
```

---

### Install Nginx

```bash
# Install Nginx
sudo apt-get install -y nginx

# Start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verify
sudo systemctl status nginx
```

---

## Environment Configuration

### Production Environment File

Create `.env.prod`:

```env
# ============================================
# PRODUCTION ENVIRONMENT CONFIGURATION
# ============================================

# Application
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/production-db?retryWrites=true&w=majority

# JWT (CRITICAL: Use strong random secrets)
JWT_SECRET=<GENERATE_STRONG_RANDOM_SECRET_HERE>
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=<GENERATE_DIFFERENT_STRONG_SECRET>
JWT_REFRESH_EXPIRES_IN=30d

# Redis
REDIS_HOST=your-redis-host.com
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# CORS (Whitelist specific domains)
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_DIR=/var/log/backend-api

# Email (if using SendGrid)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-key

# Security
BCRYPT_ROUNDS=12
ENABLE_HTTPS=true
```

---

### Generate Strong Secrets

```bash
# Generate JWT secret (32 bytes = 256 bits)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate refresh secret (different from JWT secret)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Save these in .env.prod
```

---

## Database Configuration

### MongoDB Atlas Setup

1. **Create Cluster**:
   - Log into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create new cluster (M10+ for production)
   - Select region closest to your server

2. **Configure Network Access**:
   - Add your server's IP address
   - Or use VPC peering for better security

3. **Create Database User**:
   ```
   Username: production-user
   Password: <strong-random-password>
   Role: readWrite on production-db
   ```

4. **Get Connection String**:
   ```
   mongodb+srv://production-user:password@cluster.mongodb.net/production-db?retryWrites=true&w=majority
   ```

5. **Create Indexes** (run via mongosh):
   ```bash
   mongosh "mongodb+srv://cluster.mongodb.net/production-db" --username production-user
   
   # Run index creation
   db.users.createIndex({ email: 1 }, { unique: true })
   db.users.createIndex({ status: 1, createdAt: -1 })
   db.products.createIndex({ status: 1, createdAt: -1 })
   db.products.createIndex({ category: 1, status: 1 })
   ```

---

### Backup Strategy

**Automated Backups** (MongoDB Atlas):
- Enable continuous backups
- Retention: 7 days minimum
- Schedule: Daily at 2 AM UTC

**Manual Backup**:
```bash
# Backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/production-db" --out=/backups/$(date +%F)

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/production-db" /backups/2025-02-04
```

---

## Redis Configuration

### Redis Cloud (Recommended)

1. **Create Instance**:
   - Use [Redis Cloud](https://redis.com/try-free/)
   - Select 250MB+ plan
   - Choose region closest to server

2. **Get Credentials**:
   ```
   Host: redis-xxxxx.cloud.redislabs.com
   Port: 12345
   Password: your-password
   ```

3. **Test Connection**:
   ```bash
   redis-cli -h redis-xxxxx.cloud.redislabs.com -p 12345 -a your-password ping
   ```

---

### Self-Hosted Redis

**Configuration** (`/etc/redis/redis.conf`):
```conf
# Bind to localhost and server IP
bind 127.0.0.1 YOUR_SERVER_IP

# Require password
requirepass YOUR_STRONG_PASSWORD

# Persistence
save 900 1
save 300 10
save 60 10000

# Max memory
maxmemory 256mb
maxmemory-policy allkeys-lru
```

**Restart Redis**:
```bash
sudo systemctl restart redis-server
```

---

## PM2 Setup

### Ecosystem Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      // Main Application
      name: 'backend-api',
      script: './src/server.js',
      instances: 'max',  // Use all CPU cores
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
      error_file: '/var/log/backend-api/pm2-error.log',
      out_file: '/var/log/backend-api/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      
      // Health monitoring
      listen_timeout: 3000,
      kill_timeout: 5000,
    },
    
    // Email Worker
    {
      name: 'email-worker',
      script: './src/jobs/workers/email.worker.js',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
      },
      error_file: '/var/log/backend-api/worker-error.log',
      out_file: '/var/log/backend-api/worker-out.log',
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
```

---

### PM2 Commands

```bash
# Start application
pm2 start ecosystem.config.js --env production

# View status
pm2 status

# View logs
pm2 logs backend-api

# Monitor resources
pm2 monit

# Restart application
pm2 restart backend-api

# Reload (zero-downtime)
pm2 reload backend-api

# Stop application
pm2 stop backend-api

# Delete from PM2
pm2 delete backend-api

# Save PM2 configuration
pm2 save

# Show startup command
pm2 startup
```

---

## Nginx Configuration

### Reverse Proxy Setup

Create `/etc/nginx/sites-available/backend-api`:

```nginx
# Upstream backend
upstream backend_api {
    least_conn;
    server 127.0.0.1:5000;
    # Add more instances if running multiple
    # server 127.0.0.1:5001;
    # server 127.0.0.1:5002;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.yourdomain.com;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Logging
    access_log /var/log/nginx/backend-api-access.log;
    error_log /var/log/nginx/backend-api-error.log;
    
    # Client body size limit
    client_max_body_size 10M;
    
    # Proxy settings
    location / {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        
        # Proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering off;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check endpoint (bypass auth)
    location /health {
        proxy_pass http://backend_api/health;
        access_log off;
    }
}
```

---

### Enable Nginx Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/backend-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## SSL/TLS Setup

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Certificate auto-renewal (already configured)
sudo certbot renew --dry-run

# Verify renewal timer
sudo systemctl status certbot.timer
```

---

### SSL Certificate Locations

```
Certificate: /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem
Private Key: /etc/letsencrypt/live/api.yourdomain.com/privkey.pem
Chain: /etc/letsencrypt/live/api.yourdomain.com/chain.pem
```

---

## Monitoring & Logging

### Log Directory Setup

```bash
# Create log directory
sudo mkdir -p /var/log/backend-api
sudo chown -R $USER:$USER /var/log/backend-api

# Create log rotation config
sudo nano /etc/logrotate.d/backend-api
```

**Log Rotation Config**:
```
/var/log/backend-api/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 $USER $USER
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

---

### Winston Logging

Logs are automatically written to:
```
/var/log/backend-api/application-YYYY-MM-DD.log
/var/log/backend-api/error-YYYY-MM-DD.log
/var/log/backend-api/http-YYYY-MM-DD.log
```

---

### Monitoring Tools

**PM2 Monitoring**:
```bash
# Real-time monitoring
pm2 monit

# Web dashboard (optional)
pm2 link YOUR_SECRET_KEY YOUR_PUBLIC_KEY
```

**System Monitoring**:
```bash
# Install htop
sudo apt-get install -y htop

# Monitor system
htop
```

**Recommended APM Tools**:
- **New Relic** - Application performance monitoring
- **Sentry** - Error tracking
- **DataDog** - Infrastructure monitoring
- **LogDNA** - Log aggregation

---

## Deployment Process

### 1. Prepare Application

```bash
# On your local machine

# Pull latest code
git pull origin main

# Install dependencies
npm ci

# Run tests
npm test

# Build (if applicable)
npm run build
```

---

### 2. Deploy to Server

**Using Git (Recommended)**:

```bash
# SSH into server
ssh user@your-server-ip

# Navigate to application directory
cd /var/www/backend-api

# Pull latest changes
git pull origin main

# Install production dependencies
npm ci --production

# Create/update .env.prod
nano .env.prod

# Copy to .env
cp .env.prod .env
```

---

### 3. Database Migrations

```bash
# Run any database migrations
node scripts/migrate.js

# Verify indexes
mongosh "your-connection-string" --eval "db.users.getIndexes()"
```

---

### 4. Start Application

```bash
# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# View logs
pm2 logs backend-api --lines 100
```

---

### 5. Verify Deployment

```bash
# Check PM2 status
pm2 status

# Test health endpoint
curl https://api.yourdomain.com/health

# Test API endpoint
curl https://api.yourdomain.com/api/v1/products
```

---

## Post-Deployment Verification

### Automated Tests

Create `scripts/verify-deployment.sh`:

```bash
#!/bin/bash

API_URL="https://api.yourdomain.com"
HEALTH_ENDPOINT="$API_URL/health"
API_ENDPOINT="$API_URL/api/v1/products"

echo "========================================="
echo "Deployment Verification Script"
echo "========================================="

# Test 1: Health Check
echo -e "\n[1/5] Testing health endpoint..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_ENDPOINT)
if [ $HEALTH_STATUS -eq 200 ]; then
    echo "Health check passed"
else
    echo "Health check failed (Status: $HEALTH_STATUS)"
    exit 1
fi

# Test 2: API Endpoint
echo -e "\n[2/5] Testing API endpoint..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_ENDPOINT)
if [ $API_STATUS -eq 200 ]; then
    echo "API endpoint accessible"
else
    echo "API endpoint failed (Status: $API_STATUS)"
    exit 1
fi

# Test 3: HTTPS
echo -e "\n[3/5] Verifying HTTPS..."
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k $API_URL)
if [ $HTTPS_STATUS -eq 200 ] || [ $HTTPS_STATUS -eq 301 ]; then
    echo "HTTPS configured"
else
    echo "HTTPS verification failed"
    exit 1
fi

# Test 4: Database Connection
echo -e "\n[4/5] Checking database connection..."
DB_RESPONSE=$(curl -s $HEALTH_ENDPOINT | jq -r '.checks.database')
if [ "$DB_RESPONSE" == "connected" ]; then
    echo "Database connected"
else
    echo "Database connection failed"
    exit 1
fi

# Test 5: PM2 Status
echo -e "\n[5/5] Checking PM2 status..."
PM2_STATUS=$(pm2 jlist | jq -r '.[0].pm2_env.status')
if [ "$PM2_STATUS" == "online" ]; then
    echo "Application running"
else
    echo "Application not running"
    exit 1
fi

echo -e "\n========================================="
echo "All verification checks passed!"
echo "========================================="
```

**Run verification**:
```bash
chmod +x scripts/verify-deployment.sh
./scripts/verify-deployment.sh
```

---

### Manual Verification Checklist

- [ ] Health endpoint returns 200
- [ ] API endpoints responding
- [ ] HTTPS working (no certificate errors)
- [ ] Database connected
- [ ] Redis connected (check logs)
- [ ] PM2 showing "online" status
- [ ] Logs being written
- [ ] No errors in logs
- [ ] Rate limiting working
- [ ] Authentication working

---

## Rollback Procedure

### Quick Rollback

**If using Git tags**:

```bash
# View deployed version
git describe --tags

# Rollback to previous tag
git checkout tags/v1.0.0

# Reinstall dependencies
npm ci --production

# Restart application
pm2 restart backend-api

# Verify
pm2 logs backend-api
```

---

### Database Rollback

```bash
# Restore from backup
mongorestore --uri="connection-string" /backups/2025-02-03
```

---

### Emergency Rollback

```bash
# Stop current version
pm2 stop backend-api

# Switch to backup directory
cd /var/www/backend-api-backup

# Start backup version
pm2 start ecosystem.config.js --env production
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Application Won't Start

**Symptoms**: PM2 shows "errored" status

**Solutions**:
```bash
# Check logs
pm2 logs backend-api --lines 50

# Common causes:
# 1. Missing environment variables
cat .env

# 2. Port already in use
lsof -i :5000
kill -9 <PID>

# 3. Database connection failed
ping your-mongo-host

# 4. Syntax errors
node --check src/server.js
```

---

#### Issue 2: High Memory Usage

**Symptoms**: PM2 keeps restarting due to max_memory_restart

**Solutions**:
```bash
# Check memory usage
pm2 monit

# Increase limit in ecosystem.config.js
max_memory_restart: '1G'

# Check for memory leaks
node --inspect src/server.js

# Restart
pm2 restart backend-api
```

---

#### Issue 3: Database Connection Timeout

**Symptoms**: "MongoServerSelectionError" in logs

**Solutions**:
```bash
# 1. Check network access (MongoDB Atlas)
# Add server IP to whitelist

# 2. Verify credentials
mongosh "your-connection-string"

# 3. Check connection string
grep MONGODB_URI .env

# 4. Increase timeout
# In config/index.js
serverSelectionTimeoutMS: 10000
```

---

#### Issue 4: SSL Certificate Issues

**Symptoms**: Browser shows "Not Secure"

**Solutions**:
```bash
# Check certificate expiry
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Verify Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

#### Issue 5: 502 Bad Gateway

**Symptoms**: Nginx returns 502 error

**Solutions**:
```bash
# 1. Check if app is running
pm2 status

# 2. Check app port
grep PORT .env

# 3. Check Nginx config
sudo nginx -t

# 4. Check Nginx error logs
sudo tail -f /var/log/nginx/backend-api-error.log

# 5. Restart services
pm2 restart backend-api
sudo systemctl reload nginx
```

---

### Performance Tuning

**Optimize Node.js**:
```bash
# Increase max old space size
node --max-old-space-size=4096 src/server.js
```

**PM2 Cluster Mode**:
```javascript
// ecosystem.config.js
instances: 'max',  // Use all CPU cores
exec_mode: 'cluster'
```

**Nginx Caching**:
```nginx
# Cache static responses
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Continuous Deployment

### GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/backend-api
          git pull origin main
          npm ci --production
          pm2 reload ecosystem.config.js --env production
```

---

## Maintenance

### Regular Tasks

**Daily**:
- Monitor error logs
- Check PM2 status
- Verify backups

**Weekly**:
- Review performance metrics
- Check disk space
- Update dependencies

**Monthly**:
- Security audit
- SSL certificate check
- Database optimization
- Log cleanup

