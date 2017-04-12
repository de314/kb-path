'use strict';

function defaultTo(val, defaultVal) {
  return (typeof val !== 'undefined') ? val : defaultVal
}

function cleanOptions(options) {
  options = defaultTo(options, {});
  options.container = defaultTo(options.container, false);
  options.createMissing = defaultTo(options.createMissing, false);
  return options;
}

function isPath(path, options) {
  if (!/^\$(?:\.[\w$]+(?:\[\d+\])?)*$/.test(path)) {
    return false;
  }
  options = cleanOptions(options);
  if (path === "$" && options.container) {
    return false;
  }
  return true;
}

function getField(path) {
  var res = /^\$(?:\.([\w$]+(?:\[\d+\])?))*$/.exec(path);
  return res !== null && res.length > 0 ? res[1] : undefined;
}

function traverse(o, path, options) {
  options = cleanOptions(options);
  if (!isPath(path, options)) {
    return undefined;
  }
  var partPattern = /(?:\.([\w$]+(?:\[\d+\])?))/g;
  if (path === "$") {
    return o
  }
  var create = options.createMissing,
      currField,
      value = o,
      container = o,
      group;
  while ((group = partPattern.exec(path)) !== null) {
    var part = group[1],
        arrIndex = part.indexOf('[');
    if (arrIndex < 0) {
      if (typeof value[part] === 'undefined') {
        if (create) {
          if (typeof value !== 'object') {
            value = {}
            container[currField] = value
          }
          value[part] = {}
        } else {
          return undefined;
        }
      }
      container = value;
      value = container[part]
    } else {
      var arrayPart = /^([\w$]+)\[(\d+)\]$/.exec(part),
          field = arrayPart[1],
          index = parseInt(arrayPart[2]);
      if (!Array.isArray(value[field]) || value[field].length <= index) {
        return undefined;
      }
      container = value[field];
      value = container[index]
    }
    currField = part;
  }
  return options.container ? container : value
}

function path(o, path, container) {
  return traverse(o, path, { container: container, createMissing: false });
}

function pathP(o, path, container) {
  return traverse(o, path, { container: container, createMissing: true });
}

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = {
  isPath: isPath,
  getField: getField,
  traverse: traverse,
  path: path,
  pathP: pathP,
  set: function(o, path, val, createMissing) {
    var container = pathP(o, path, true);
    if (typeof container === 'object' && !Array.isArray(container)) {
      var field = getField(path);
      container[field] = val;
    }
  }
};
