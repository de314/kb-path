'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

describe('#path', function() {
  it('should fail invalid path', function() {
      var result = jsonpath.path('Not a path');
      expect(result).to.equal(undefined);
  });

  it('should return base path', function() {
      var o = { testing: 0 },
          result = jsonpath.path(o, '$');
      expect(result).to.equal(o);
  });

  it('should fail base path container', function() {
      var o = { testing: 0 },
          result = jsonpath.path(o, '$', true);
      expect(result).to.equal(undefined);
  });

  it('should return shallow path', function() {
      var o = { testing: 42 },
          result = jsonpath.path(o, '$.testing');
      expect(result).to.equal(42);
  });

  it('should return shallow path container', function() {
      var o = { testing: 0 },
          result = jsonpath.path(o, '$.testing', true);
      expect(result).to.equal(o);
  });

  it('should return deep path', function() {
      var o = { testing: { a: { long: { path: true } } } },
          result = jsonpath.path(o, '$.testing.a.long.path');
      expect(result).to.equal(true);
  });

  it('should return deep path container', function() {
      var o = { testing: { a: { long: { path: true } } } },
          result = jsonpath.path(o, '$.testing.a.long.path', true);
      expect(result).to.deep.equal({ path: true });
  });

  it('should return deep path after array', function() {
      var o = { testing: { arr: [ false, { long: { path: true } } ] } },
          result = jsonpath.path(o, '$.testing.arr[1].long.path');
      expect(result).to.equal(true);
  });

  it('should return deep path container after array', function() {
      var o = { testing: { arr: [ false, { long: { path: true } } ] } },
          result = jsonpath.path(o, '$.testing.arr[1].long.path', true);
      expect(result).to.deep.equal({ path: true });
  });

});
