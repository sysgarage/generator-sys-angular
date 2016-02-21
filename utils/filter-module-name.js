'use strict';
var _ = require('lodash');

module.exports = function(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.camelCase(moduleParts[i]);
  }
  return _.join(moduleParts, '.');
};
