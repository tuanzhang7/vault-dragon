'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/store'
    //uri: 'mongodb://root:mongodbpassword@cluster0-shard-00-00-xm6d3.mongodb.net:27017,
    //cluster0-shard-00-01-xm6d3.mongodb.net:27017,cluster0-shard-00-02-xm6d3.mongodb.net:27017/store?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
  },
  // Seed database on startup
  seedDB: false

};
