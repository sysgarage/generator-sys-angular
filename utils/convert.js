'use strict';
var _ = require('lodash');

var convert = {
  moduleToFolder: moduleToFolder
};

function moduleToFolder(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.kebabCase(moduleParts[i]);
  }
  return _.join(moduleParts, '/') + '/';
}

module.exports = convert;
