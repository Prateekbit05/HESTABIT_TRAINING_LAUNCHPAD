const logger = require('../utils/logger');
const config = require('../config');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err.name === 'CastError') {
    error = { message: 'Resource not found', statusCode: 404 };
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error = { message: `${field} already exists`, statusCode: 409 };
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    error = {
      message: 'Validation failed',
      statusCode: 422,
      errors
    };
  }

  const statusCode = error.statusCode || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(error.errors && { errors: error.errors }),
    ...(config.isDevelopment && { stack: err.stack }),
    path: req.path,
    timestamp: new Date().toISOString()
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, asyncHandler };