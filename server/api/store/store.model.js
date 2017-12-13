'use strict';

import mongoose from 'mongoose';

var StoreSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    minlength: 1
  },
  value: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date
    // required: true
    // default: Date.now
  }
});

//add index for key query performance
StoreSchema.index({ key: 1});

//for key AND a timestamp query
StoreSchema.index({ key: 1, timestamp: 1 });

// for testing, can mock any date here
StoreSchema.pre('save', function (next) {
  if (!this.timestamp) {
    this.timestamp = new Date();
  }
  next();
});

export default mongoose.model('Store', StoreSchema);
