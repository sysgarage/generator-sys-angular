'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require(path.join(__dirname, '../../utils/filters.js'));
var convert = require(path.join(__dirname, '../../utils/convert.js'));
var context = require(path.join(__dirname, '../../utils/context.js'));

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.sourceRoot(path.join(__dirname, '../../templates'));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.modules.default',
      filter: filters.moduleNameFilter
    }, {
      type: 'checkbox',
      name: 'components',
      message: 'Select the components to be created:',
      choices: Object.keys(getChoices()),
      default: ['controller', 'route', 'view', 'style']
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var _this = this;
    var moduleName = getModuleName(this.props.module);
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);
    var moduleContext = context.getDefaults(moduleName, this.props.module);
    var choices = getChoices();

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

function getChoices() {
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
      template: 'view.scss',
      destination: '.scss'
    },
    service: {
      template: 'service.js',
      destination: '.service.js'
    }
  };
}
