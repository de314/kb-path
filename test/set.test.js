'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

describe('#getField', function() {
  it('should noop invalid path', function() {
      var o = {},
          expected = {},
          result = jsonpath.set(o, 'Not a path', 42);
      expect(o).to.deep.equal(expected);
  });

  it('should noop base path', function() {
      var o = {},
          expected = {},
          result = jsonpath.set(o, '$', 42);
      expect(o).to.deep.equal(expected);
  });


  /* SHALLOW */


  it('should set num shallow', function() {
      var o = {},
          expected = { num: 42 },
          result = jsonpath.set(o, '$.num', 42);
      expect(o).to.deep.equal(expected);
  });

  it('should set string shallow', function() {
      var o = {},
          expected = { message: 'Hello, World!' },
          result = jsonpath.set(o, '$.message', "Hello, World!");
      expect(o).to.deep.equal(expected);
  });

  it('should set object shallow', function() {
      var o = {},
          expected = { nested: { testing: true } },
          result = jsonpath.set(o, '$.nested', { testing: true });
      expect(o).to.deep.equal(expected);
  });

  it('should set array shallow', function() {
      var o = {},
          expected = { arr: [ 1, 2, 3 ] },
          result = jsonpath.set(o, '$.arr', [ 1, 2, 3 ]);
      expect(o).to.deep.equal(expected);
  });


  /* DEEP */


  it('should set num deep', function() {
      var o = {},
          expected = { a: { deep: { path: { num: 42 } } } },
          result = jsonpath.set(o, '$.a.deep.path.num', 42);
      expect(o).to.deep.equal(expected);
  });

  it('should set string deep', function() {
      var o = {},
          expected = { a: { deep: { path: { message: 'Hello, World!' } } } },
          result = jsonpath.set(o, '$.a.deep.path.message', "Hello, World!");
      expect(o).to.deep.equal(expected);
  });

  it('should set object deep', function() {
      var o = {},
          expected = { a: { deep: { path: { nested: { testing: true } } } } },
          result = jsonpath.set(o, '$.a.deep.path.nested', { testing: true });
      expect(o).to.deep.equal(expected);
  });

  it('should set array deep', function() {
      var o = {},
          expected = { a: { deep: {path: { arr: [ 1, 2, 3 ] } } } },
          result = jsonpath.set(o, '$.a.deep.path.arr', [ 1, 2, 3 ]);
      expect(o).to.deep.equal(expected);
  });


  /* OTHER */


  it('should set value after array', function() {
      var o = { an: { arr: [ 4, { } ] } },
          expected = { an: { arr: [ 4, { path: 42 } ] } },
          result = jsonpath.set(o, '$.an.arr[1].path', 42);
      expect(o).to.deep.equal(expected);
  });


  it('should override same type (num)', function() {
      var o = { test: -1 },
          expected = { test: 18 },
          result = jsonpath.set(o, '$.test', 18);
      expect(o).to.deep.equal(expected);
  });


  it('should override different type', function() {
      var o = { test: -1 },
          expected = { test: true },
          result = jsonpath.set(o, '$.test', true);
      expect(o).to.deep.equal(expected);
  });

});
