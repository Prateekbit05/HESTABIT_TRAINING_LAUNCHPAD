const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const config = require('../config');
const logger = require('../utils/logger');

const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' }
});

const corsOptions = {
  origin: config.cors.origin === '*' ? true : config.cors.origin.split(','),
  credentials: config.cors.credentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many auth attempts, try again after 15 minutes.' }
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many password reset attempts, try again after 1 hour.' }
});

const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many create requests, please slow down.' }
});

const noSQLSanitizer = mongoSanitize({ replaceWith: '_' });
const xssSanitizer = xss();
const hppProtection = hpp({ whitelist: ['price', 'category', 'stock', 'sort'] });

const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.removeHeader('X-Powered-By');
  next();
};

const applySecurityMiddlewares = (app) => {
  app.use(helmetConfig);
  app.use(cors(corsOptions));
  app.use(noSQLSanitizer);
  app.use(xssSanitizer);
  app.use(hppProtection);
  app.use(securityHeaders);
  logger.info('✔ Security middlewares applied');
};

module.exports = {
  helmetConfig,
  corsOptions: cors(corsOptions),
  apiLimiter,
  authLimiter,
  passwordResetLimiter,
  createLimiter,
  noSQLSanitizer,
  xssSanitizer,
  hppProtection,
  securityHeaders,
  applySecurityMiddlewares
};
// Security middleware: Helmet CORS rate limiting and payload size hardening
