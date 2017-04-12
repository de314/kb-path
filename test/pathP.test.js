'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

describe('#pathP', function() {
  it('should fail invalid path', function() {
      var result = jsonpath.pathP('Not a path');
      expect(result).to.equal(undefined);
  });

  it('should return base path', function() {
      var o = { testing: 0 },
          result = jsonpath.pathP(o, '$');
      expect(result).to.equal(o);
  });

  it('should fail base path container', function() {
      var o = { testing: 0 },
          result = jsonpath.pathP(o, '$', true);
      expect(result).to.equal(undefined);
  });


  /* EXISTING */


  it('should return shallow path', function() {
      var o = { testing: 42 },
          result = jsonpath.pathP(o, '$.testing');
      expect(result).to.equal(42);
  });

  it('should return shallow path container', function() {
      var o = { testing: 0 },
          result = jsonpath.pathP(o, '$.testing', true);
      expect(result).to.equal(o);
  });

  it('should return deep path', function() {
      var o = { testing: { a: { long: { path: true } } } },
          result = jsonpath.pathP(o, '$.testing.a.long.path');
      expect(result).to.equal(true);
  });

  it('should return deep path container', function() {
      var o = { testing: { a: { long: { path: true } } } },
          result = jsonpath.pathP(o, '$.testing.a.long.path', true);
      expect(result).to.deep.equal({ path: true });
  });

  it('should return deep path after array', function() {
      var o = { testing: { arr: [ false, { long: { path: true } } ] } },
          result = jsonpath.pathP(o, '$.testing.arr[1].long.path');
      expect(result).to.equal(true);
  });

  it('should return deep path container after array', function() {
      var o = { testing: { arr: [ false, { long: { path: true } } ] } },
          result = jsonpath.pathP(o, '$.testing.arr[1].long.path', true);
      expect(result).to.deep.equal({ path: true });
  });


  /* MISSING */


  it('should create shallow path', function() {
      var o = { },
          result = jsonpath.pathP(o, '$.testing');
      expect(o).to.deep.equal({ testing: {} });
      expect(result).to.deep.equal({});
  });

  it('should create shallow path container', function() {
      var o = { },
          result = jsonpath.pathP(o, '$.testing', true);
      expect(o).to.deep.equal({ testing: {} });
      expect(result).to.deep.equal({ testing: {} });
  });

  it('should create deep path', function() {
      var o = {},
          expected = { testing: { a: { long: { path: {} } } } },
          result = jsonpath.pathP(o, '$.testing.a.long.path');
      expect(o).to.deep.equal(expected);
      expect(result).to.deep.equal({});
  });

  it('should create deep path container', function() {
    var o = {},
        expected = { testing: { a: { long: { path: {} } } } },
        result = jsonpath.pathP(o, '$.testing.a.long.path', true);
    expect(o).to.deep.equal(expected);
    expect(result).to.deep.equal({ path: {} });
  });

  it('should create deep path after array', function() {
      var o = { testing: { arr: [ false, { } ] } },
          expected = { testing: { arr: [ false, { long: { path: {} } } ] } },
          result = jsonpath.pathP(o, '$.testing.arr[1].long.path');
      expect(o).to.deep.equal(expected);
      expect(result).to.deep.equal({});
  });

  it('should create deep path container after array', function() {
      var o = { testing: { arr: [ false, { } ] } },
          expected = { testing: { arr: [ false, { long: { path: {} } } ] } },
          result = jsonpath.pathP(o, '$.testing.arr[1].long.path', true);
      expect(o).to.deep.equal(expected);
      expect(result).to.deep.equal({ path: {} });
  });

});
