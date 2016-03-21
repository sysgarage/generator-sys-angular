'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require(path.join(__dirname, '../../utils/filters.js'));
var convert = require(path.join(__dirname, '../../utils/convert.js'));
var context = require(path.join(__dirname, '../../utils/context.js'));
var updater = require(path.join(__dirname, '../../utils/updater.js'));

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.sourceRoot(path.join(__dirname, '../../templates'));
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
      default: getDefaultModule,
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
    var directiveContext = context.getDefaults(this.props.name, this.props.module);
    var styleExt = this.config.get('style') || 'scss';

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.module.js'),
      directiveContext
    );

    this.fs.copyTpl(
      this.templatePath('directive.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.directive.js'),
      directiveContext
    );

    this.fs.copyTpl(
      this.templatePath('directive.jade'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.directive.jade')
    );

    this.fs.copyTpl(
      this.templatePath('directive.css'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.directive.' + styleExt),
      directiveContext
    );

    updater.updateParentModule(this.props.module, this.destinationPath(destinationFolder));
  }
});

function getDefaultModule(props) {
  return 'app.directives.' + _.camelCase(props.name);
}
