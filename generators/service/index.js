'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the service name:',
      default: 'default'
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'Enter the module name:',
      default: 'app.services',
      filter: filterModuleName
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var destinationFolder = 'src/' + toFolderPath(this.props.moduleName);
    var context = {
      moduleName: this.props.moduleName,
      serviceName: toServiceName(this.props.name)
    };

    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(destinationFolder + toFileName(this.props.name)),
      context
    );
  }
});

function filterModuleName(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.camelCase(moduleParts[i]);
  }
  return _.join(moduleParts, '.');
}

function toFileName(name) {
  return _.kebabCase(name) + '.service.js';
}

function toFolderPath(moduleName) {
  var moduleParts = moduleName.split('.');
  for (var i = 0; i < moduleParts.length; i++) {
    moduleParts[i] = _.kebabCase(moduleParts[i]);
  }
  return _.join(moduleParts, '/') + '/';
}

function toServiceName(name) {
  return _.camelCase(name) + 'Service';
}
