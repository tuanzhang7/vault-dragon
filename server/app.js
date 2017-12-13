/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}
// ============== only for debug
// mongoose.set('debug', true);
// Setup server
var app = express();

var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

console.log('before startServer');
// Start server
function startServer() {
  app.store = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    console.log('mongoose.connection.db ' + config.mongo.uri);
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
