'use strict';
/* eslint-env mocha */
import sinon from 'sinon';
var proxyquire = require('proxyquire').noPreserveCache();

var storeCtrlStub = {
  show: 'storeCtrl.show',
  create: 'storeCtrl.create'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy()
};

// require the index with our stubbed out modules
var storeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './store.controller': storeCtrlStub
});

describe('Store API Router:', function() {
  it('should return an express router instance', function() {
    storeIndex.should.equal(routerStub);
  });

  describe('GET /api/stores/:id', function() {
    it('should route to store.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'storeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/stores', function() {
    it('should route to store.controller.create', function() {
      routerStub.post
        .withArgs('/', 'storeCtrl.create')
        .should.have.been.calledOnce;
    });
  });
});
