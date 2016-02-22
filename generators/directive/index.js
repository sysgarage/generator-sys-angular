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
      message: 'Enter the directive name:',
      default: 'sys-default'
    }, {
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.directives.sysDefault',
      filter: filters.moduleNameFilter
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var folderName = convert.moduleToFolder(this.props.module);
    var destinationFolder = 'src/' + folderName;
    var context = {
      module: this.props.module,
      directive: _.camelCase(this.props.name),
      controller: _.upperFirst(_.camelCase(this.props.name)) + 'Controller',
      templateUrl: folderName + _.kebabCase(this.props.name) + '.directive.html'
    };

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.module.js'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('directive.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.directive.js'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('directive.jade'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.directive.jade')
    );
  }
});
