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
      name: 'name',
      message: 'Enter the controller name:',
      default: 'default'
    }, {
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
      moduleName: this.props.moduleName,
      controllerName: toControllerName(this.props.name)
    };

    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(destinationFolder + toFileName(this.props.name)),
      context
    );
  }
});

function toFileName(name) {
  return _.kebabCase(name) + '.controller.js';
}

function toControllerName(name) {
  var controllerName = _.camelCase(name) + 'Controller';
  return _.upperFirst(controllerName);
}
