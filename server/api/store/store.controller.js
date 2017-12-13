/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stores              ->  index
 * POST    /api/stores              ->  create
 * GET     /api/stores/:id          ->  show
 */

'use strict';

import Store from './store.model';
import helper from './helper';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a single Store from the DB
export function show(req, res) {
  let query = {};
  query.key = req.params.key;
  let time = Number(req.query.timestamp) * 1000;
  if(time){
    query.timestamp = {
      $lte: new Date(time)
    };
  }
  return Store.findOne(query)
    .sort({ timestamp: -1})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Store in the DB
export function create(req, res) {
  if (helper.isValidKeyValue(req.body)){
    let key = Object.keys(req.body)[0];
    let value = JSON.stringify(req.body[key]);
    let store = {
      key,
      value
    };
    return Store.create(store)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  }else{
    res.statusMessage = 'invalid Key Value input, please correct it.';
    return res.status(400).end();
  }
}


