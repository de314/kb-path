'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

function getOptions(container, create) {
  return {
    container: container | false,
    createMissing: create | false,
  }
}

describe('#traverse', function() {
  it('should fail invalid path', function() {
      var result = jsonpath.traverse({}, 'Not a path');
      expect(result).to.equal(undefined);
  });

  it('should accept base path', function() {
    var o = { testing: true },
        result = jsonpath.traverse(o, '$');
    expect(result).to.equal(o);
  });

  it('should accept short object path to boolean', function() {
    var o = { testing: true },
        result = jsonpath.traverse(o, '$.testing');
    expect(result).to.equal(true);
  });

  it('should accept short object path to string', function() {
    var o = { message: "Hello, World!" },
        result = jsonpath.traverse(o, '$.message');
    expect(result).to.equal("Hello, World!");
  });

  it('should accept long object path to object', function() {
    var nested = { _5: 5 },
        o = { this: { is: { a: { path: nested } }} },
        result = jsonpath.traverse(o, '$.this.is.a.path');
    expect(result).to.equal(nested);
  });

  it('should accept short object container path', function() {
    var o = { message: "Hello, World!" },
        result = jsonpath.traverse(o, '$.message', getOptions(true, false));
    expect(result).to.equal(o);
  });

  it('should accept long object container path', function() {
    var nested = { _5: 5 },
        o = { this: { is: { a: { path: nested } }} },
        result = jsonpath.traverse(o, '$.this.is.a.path._5', getOptions(true, false));
    expect(result).to.equal(nested);
  });

  it('should not create by default', function() {
    var result = jsonpath.traverse({}, '$.testing');
    expect(result).to.equal(undefined);
  });

  it('should not create by default - deep', function() {
    var result = jsonpath.traverse({}, '$.testing.a.long.path');
    expect(result).to.equal(undefined);
  });

  it('should create short object paths', function() {
    var o = {},
        result = jsonpath.traverse(o, '$.testing', getOptions(false, true));
    expect(o).to.deep.equal({ testing: result });
    expect(result).to.deep.equal({});
  });

  it('should create short object paths - deep', function() {
    var o = {},
        result = jsonpath.traverse(o, '$.testing.a.long.path', getOptions(false, true));
    expect(o).to.deep.equal({ testing: { a: { long: { path: result } } } });
    expect(result).to.deep.equal({ });
  });

  it('should create short object paths and return container', function() {
    var o = {},
        result = jsonpath.traverse(o, '$.testing', getOptions(true, true));
    expect(o).to.deep.equal({ testing: {} });
    expect(result).to.deep.equal({ testing: {} });
  });

  it('should create short object paths and return container - deep', function() {
    var o = {},
        result = jsonpath.traverse(o, '$.testing.a.long.path', getOptions(true, true));
    expect(o).to.deep.equal({ testing: { a: { long: { path: {} } } } });
    expect(result).to.deep.equal({ path: {} });
  });

  it('should access an array', function() {
    var o = { arr: [ false, 42, "Hi Mom!" ] },
        result = jsonpath.traverse(o, '$.arr[1]');
    expect(result).to.equal(42);
  });

  it('should access object after an array', function() {
    var o = { arr: [ false, { message: "Hello, World!" }, "Hi Mom!" ] },
        result = jsonpath.traverse(o, '$.arr[1].message');
    expect(result).to.equal("Hello, World!");
  });

  it('should not create an array - default', function() {
    var o = {  },
        result = jsonpath.traverse(o, '$.arr[1]');
    expect(result).to.equal(undefined);
    expect(o).to.deep.equal({});
  });

  it('should not create an array - explicit', function() {
    var o = {  },
        result = jsonpath.traverse(o, '$.arr[1]', getOptions(false, true));
    expect(result).to.equal(undefined);
    expect(o).to.deep.equal({});
  });

  it('should create after an array', function() {
    var o = { arr: [ false, {}, true ] },
        result = jsonpath.traverse(o, '$.arr[1].createMe', getOptions(false, true));
    expect(result).to.deep.equal({});
    expect(o).to.deep.equal({ arr: [ false, { createMe: {} } , true ] });
  });

  it('should return array container', function() {
    var o = { arr: [ false, 42, "Hi Mom!" ] },
        result = jsonpath.traverse(o, '$.arr[1]', getOptions(true, false));
    expect(result).to.deep.equal([ false, 42, "Hi Mom!" ]);
  });

  it('should convert non objects when createMissing', function() {
    var o = { test: 5 },
        result = jsonpath.traverse(o, '$.test.convert', getOptions(false, true));
    expect(result).to.deep.equal({});
    expect(o).to.deep.equal({ test: { convert: {} } });
  });

});
