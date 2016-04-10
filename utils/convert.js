'use strict';
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var convert = {
  moduleToFolder: moduleToFolder,
  pathToModule: pathToModule
};

function pathToModule(dir, entered) {
  var moduleName = _.camelCase(path.basename(dir));
  var moduleFilename = moduleName + '.module.js';
  var moduleFilePath = path.resolve(dir, moduleFilename);
  var prefix;
  try {
    fs.accessSync(moduleFilePath, fs.F_OK);
    prefix = pathToModule(path.resolve(dir, '..'), true);
    return (prefix) ? prefix + '.' + moduleName : moduleName;
  } catch (e) {
    if (entered) {
      return '';
    } else {
      prefix = pathToModule(path.resolve(dir, '..'), true);
      return (prefix) ? prefix + '.' + moduleName : moduleName;
    }
  }
}

function moduleToFolder(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.kebabCase(moduleParts[i]);
  }
  return _.join(moduleParts, '/') + '/';
}

module.exports = convert;
