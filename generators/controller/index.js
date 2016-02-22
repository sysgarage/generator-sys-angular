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
      controllerName: _.upperFirst(_.camelCase(this.props.name)) + 'Controller'
    };

    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.controller.js'),
      context
    );
  }
});
