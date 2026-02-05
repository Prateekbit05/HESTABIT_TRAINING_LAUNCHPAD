const express = require('express');
const loaders = require('./loaders');

async function createApp() {
  const app = express();
  await loaders(app);
  return app;
}

module.exports = createApp;