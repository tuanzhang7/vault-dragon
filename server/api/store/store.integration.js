'use strict';

var app = require('../..');
import request from 'supertest';

var newStore;

describe('Store API:', function() {
  describe('GET /api/stores', function() {
    var stores;

    beforeEach(function(done) {
      request(app)
        .get('/api/stores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stores = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      stores.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/stores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stores')
        .send({
          name: 'New Store',
          info: 'This is the brand new store!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStore = res.body;
          done();
        });
    });

    it('should respond with the newly created store', function() {
      newStore.name.should.equal('New Store');
      newStore.info.should.equal('This is the brand new store!!!');
    });
  });

  describe('GET /api/stores/:id', function() {
    var store;

    beforeEach(function(done) {
      request(app)
        .get(`/api/stores/${newStore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          store = res.body;
          done();
        });
    });

    afterEach(function() {
      store = {};
    });

    it('should respond with the requested store', function() {
      store.name.should.equal('New Store');
      store.info.should.equal('This is the brand new store!!!');
    });
  });
});
