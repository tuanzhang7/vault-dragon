'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || '0.0.0.0',

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI
    || process.env.MONGOHQ_URL
    || process.env.MONGODB_ATLAS_URL
    || process.env.MONGODB_URL
    || 'mongodb://localhost/store'
  },
  sessionStoreMongod: {
    uri: process.env.SESSION_STORE_MONGODB_URL
    || 'mongodb://localhost/store'
  },
  seedDB: false
};
