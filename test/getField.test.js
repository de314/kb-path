'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

describe('#getField', function() {
  it('should fail invalid path', function() {
      var result = jsonpath.getField('Not a path');
      expect(result).to.equal(undefined);
  });

  it('should fail base path', function() {
      var result = jsonpath.getField('$');
      expect(result).to.equal(undefined);
  });

  it('should return shallow', function() {
      var result = jsonpath.getField('$.test');
      expect(result).to.equal("test");
  });

  it('should return deep', function() {
      var result = jsonpath.getField('$.this.is.a.long.path');
      expect(result).to.equal("path");
  });

  it('should return array', function() {
      var result = jsonpath.getField('$.arr[5]');
      expect(result).to.equal("arr[5]");
  });

});
