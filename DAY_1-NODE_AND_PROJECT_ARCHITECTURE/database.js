const config = require('../config');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = async () => {
  try {
    await mongoose.connect(config.database.uri, config.database.options);
    logger.info('✅ MongoDB connected');
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};