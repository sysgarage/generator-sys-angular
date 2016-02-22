'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require('../../utils/filters.js');
var convert = require('../../utils/convert.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.sourceRoot(path.resolve(__dirname, '../../templates'));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.modules.default',
      filter: filters.moduleNameFilter
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);
    var context = {
      module: this.props.module
    };

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(destinationFolder + getFileName(this.props.module)),
      context
    );
  }
});

function getFileName(module) {
  var name = module.split('.').pop();
  return _.kebabCase(name) + '.module.js';
}
