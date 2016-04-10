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
    }
  },

  initializing: function() {
    this.sourceRoot(path.join(__dirname, '../../templates'));
  },

  prompting: function() {
    var done = this.async();
    var styleExt = this.config.get('style') || 'scss';

    var defaultComponents = ['controller', 'route', 'view', 'style', 'service'];

    var prompts = [{
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.modules.default',
      when: !this.module
    }, {
      type: 'checkbox',
      name: 'components',
      message: 'Select the components to be created:',
      choices: Object.keys(getChoices(styleExt)),
      default: defaultComponents,
      when: !this.module
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      this.props.module = this.props.module || this.module;
      this.props.components = this.props.components || defaultComponents;
      this.props.module = filters.moduleNameFilter(this.props.module);
      done();
    }.bind(this));
  },

  writing: function() {
    var _this = this;
    var styleExt = this.config.get('style') || 'scss';
    var moduleName = getModuleName(this.props.module);
    var moduleContext = context.getDefaults(moduleName, this.props.module);
    var choices = getChoices(styleExt);

    var destinationFolder;
    if (this.path) {
      destinationFolder = path.resolve(this.path) + '/';
    } else {
      destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);
    }

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(destinationFolder + getFileName(this.props.module)),
      moduleContext
    );

    this.props.components.forEach(function(componentName) {
      var component = choices[componentName];
      _this.fs.copyTpl(
        _this.templatePath(component.template),
        _this.destinationPath(destinationFolder + _.kebabCase(moduleName) + component.destination),
        moduleContext
      );
    });

    updater.updateParentModule(this.props.module, this.destinationPath(destinationFolder));

  }
});

function getFileName(module) {
  var name = module.split('.').pop();
  return _.kebabCase(name) + '.module.js';
}

function getModuleName(module) {
  var name = module.split('.').pop();
  return _.camelCase(name);
}

function getChoices(styleExt) {
  return {
    controller: {
      template: 'controller.js',
      destination: '.controller.js'
    },
    route: {
      template: 'route.js',
      destination: '.route.js'
    },
    view: {
      template: 'view.jade',
      destination: '.jade'
    },
    style: {
      template: 'view.css',
      destination: '.' + styleExt
    },
    service: {
      template: 'service.js',
      destination: '.service.js'
    }
  };
}
