'use strict';
/* eslint-env mocha */
var app = require('../..');
import request from 'supertest';

var newStore;

describe('Store API:', function() {
  describe('GET /api/store', function() {
    var store;

    beforeEach(function(done) {
      request(app)
        .get('/api/store')
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

    it('should respond with JSON array', function() {
      store.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/store', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/store')
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

  describe('GET /api/store/:id', function() {
    var store;

    beforeEach(function(done) {
      request(app)
        .get(`/api/store/${newStore._id}`)
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
