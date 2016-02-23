'use strict';
var _ = require('lodash');
var convert = require('./convert.js');

var context = {
  getDefaults: getDefaults
};

function getDefaults(name, module) {
  var folderName = convert.moduleToFolder(module);
  return _.clone({
    module: module,
    camelName: _.camelCase(name),
    controller: _.upperFirst(_.camelCase(name)) + 'Controller',
    directive: _.camelCase(name),
    directiveUrl: folderName + _.kebabCase(name) + '.directive.html',
    kebabName: _.kebabCase(name),
    moduleClass: _.kebabCase(module),
    route: _.camelCase(name) + 'Route',
    service: _.camelCase(name) + 'Service',
    state: module.replace('app.modules.', ''),
    templateUrl: folderName + _.kebabCase(name) + '.html'
  });
}

module.exports = context;
