/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Store from '../api/store/store.model';
import Chance from 'chance';

var chance = new Chance();
var STORE_BATCH_SIZE = 1000;

function CreateKeyValue() {
  var _store = [];

  for (var i = 0; i < STORE_BATCH_SIZE; i++) {
    var key = chance.string();
    var value = chance.string();
    var timestamp = chance.date({ year: 2017 });
    var store = {
      key,
      value,
      timestamp
    };
    _store.push(store);
  }
  return _store;
}

Store.find({}).remove()
  .then(() => {
    var stores = CreateKeyValue();
    Store.create(stores).then(() => {
      console.log('seed finished');
    });
  });
