'use strict';
/* eslint-env mocha */
// require the index with our stubbed out modules
import helper from './helper.js';
describe('store helper:', function () {
  describe('isValidUnixTimestamp()', function () {
    it('1969/07/21 02:56 GMT should be valid', function () {
      helper.isValidUnixTimestamp(-14159040).should.equal(true);
    });

    it('12/13/2017 @ 6:21am (UTC) should be valid', function () {
      helper.isValidUnixTimestamp(1513146116).should.equal(true);
    });

    it('string should be invalid', function () {
      helper.isValidUnixTimestamp('string').should.equal(false);
    });

    it('date 1975-12-01T00:00:00+00:00 should be invalid', function () {
      helper.isValidUnixTimestamp('1975-12-01T00:00:00+00:00').should.equal(false);
    });
  });

  describe('isValidKeyValue()', function () {
    it('{"key":"value"} should be valid', function () {
      let kv = JSON.parse('{"key":"value"}');
      helper.isValidKeyValue(kv).should.equal(true);
    });

    it('number as key should be valid', function () {
      let kv = JSON.parse('{"0":"value"}');
      helper.isValidKeyValue(kv).should.equal(true);
    });

    it('blank should be invalid', function () {
      let kv = JSON.parse('{}');
      helper.isValidKeyValue(kv).should.equal(false);
    });

    it('nest object should be valid', function () {
      let kv = JSON.parse('{"key":{"nest":"nestvalue"}}');
      helper.isValidKeyValue(kv).should.equal(true);
    });

    it('[{"key":"value"}] array should be invalid', function () {
      let kv = JSON.parse('[{"key":"value"}]');
      helper.isValidKeyValue(kv).should.equal(false);
    });

    it('["key"] array should be invalid', function () {
      let kv = JSON.parse('["key"]');
      helper.isValidKeyValue(kv).should.equal(false);
    });
  });
});
