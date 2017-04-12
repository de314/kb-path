'use strict';

var expect = require('chai').expect;
var jsonpath = require('../index');

describe('#isPath', function() {
  it('should fail invalid path', function() {
      var result = jsonpath.isPath('Not a path');
      expect(result).to.equal(false);
  });

  it('should accept base path', function() {
      var result = jsonpath.isPath('$');
      expect(result).to.equal(true);
  });

  it('should not accept base path container', function() {
      var result = jsonpath.isPath('$', { container: true });
      expect(result).to.equal(false);
  });

  it('should not accept trailing dot', function() {
      var result = jsonpath.isPath('$.');
      expect(result).to.equal(false);
  });

  it('should not accept nested trailing dot', function() {
      var result = jsonpath.isPath('$.this.is.a.deep.path.');
      expect(result).to.equal(false);
  });

  it('should accept nested objects', function() {
      var result = jsonpath.isPath('$.this.is.a.deep.path');
      expect(result).to.equal(true);
  });

  it('should accept arrays', function() {
      var result = jsonpath.isPath('$.arr[1]');
      expect(result).to.equal(true);
  });

  it('should accept big arrays', function() {
      var result = jsonpath.isPath('$.arr[987]');
      expect(result).to.equal(true);
  });

  it('should accept objects after arrays', function() {
      var result = jsonpath.isPath('$.my.arr[987].my.object');
      expect(result).to.equal(true);
  });
});
