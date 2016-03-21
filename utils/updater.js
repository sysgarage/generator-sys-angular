'use strict';

var esprima = require('esprima');
var escodegen = require('escodegen');
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
var path = require('path');

var updater = {
  updateParentModule: updateParentModule
};

function updateParentModule(moduleName, destinationPath) {
  var parentModulePath = path.resolve(destinationPath, '..');
  var parentModuleName = path.basename(parentModulePath);
  var parentModuleFilePath = path.resolve(parentModulePath, parentModuleName + '.module.js');
  try {
    var parentModuleFile = fs.readFileSync(parentModuleFilePath);
    var parsed = esprima.parse(parentModuleFile);
    var elements = parsed.body[0].expression.callee.body.body[1].expression.arguments[1].elements;
    var hasElement = false;
    elements.forEach(function(element) {
      if (element.value === moduleName) {
        hasElement = true;
      }
    });
    if (!hasElement) {
      var newElement = {
        type: 'Literal',
        value: moduleName,
        raw: '\'' + moduleName + '\''
      };
      elements.push(newElement);
      var newCode = escodegen.generate(parsed);
      newCode = beautify(newCode, { indent_size: 2 });
      fs.writeFileSync(parentModuleFilePath, newCode);
    }
  } catch(err) {
  }
}

module.exports = updater;
