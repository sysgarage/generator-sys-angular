'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var filters = require('../../utils/filters.js');
var convert = require('../../utils/convert.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'moduleName',
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
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.moduleName);
    var context = {
      moduleName: this.props.moduleName
    };

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(destinationFolder + getFileName(this.props.moduleName)),
      context
    );
  }
});

function getFileName(moduleName) {
  var name = moduleName.split('.').pop();
  return _.kebabCase(name) + '.module.js';
}
