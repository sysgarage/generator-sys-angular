'use strict';
var _ = require('lodash');

var filters = {
  moduleNameFilter: moduleNameFilter
};

function moduleNameFilter(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.camelCase(moduleParts[i]);
  }
  return _.join(moduleParts, '.');
}

module.exports = filters;
