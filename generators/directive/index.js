'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require(path.join(__dirname, '../../utils/filters.js'));
var convert = require(path.join(__dirname, '../../utils/convert.js'));
var context = require(path.join(__dirname, '../../utils/context.js'));
var updater = require(path.join(__dirname, '../../utils/updater.js'));

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('path', {
      required: false
    });

    if (this.path) {
      this.module = convert.pathToModule(this.path);
      this.name = path.basename(this.path);
    }
  },

  initializing: function() {
    this.sourceRoot(path.join(__dirname, '../../templates'));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the directive name:',
      default: 'sys-default',
      when: !this.module
    }, {
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: getDefaultModule,
      when: !this.module
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      this.props.module = this.props.module || this.module;
      this.props.name = this.props.name || this.name;
      this.props.module = filters.moduleNameFilter(this.props.module);
      done();
    }.bind(this));
  },

  writing: function() {
    var directiveContext = context.getDefaults(this.props.name, this.props.module);
    var styleExt = this.config.get('style') || 'scss';

    var destinationFolder;
    if (this.path) {
      destinationFolder = path.resolve(this.path) + '/';
    } else {
      destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);
    }

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
