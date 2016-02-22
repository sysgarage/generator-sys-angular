'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require('../../utils/filters.js');
var convert = require('../../utils/convert.js');
var context = require('../../utils/context.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.sourceRoot(path.resolve(__dirname, '../../templates'));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the service name:',
      default: 'default'
    }, {
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.services',
      filter: filters.moduleNameFilter
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);

    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.service.js'),
      context.getDefaults(this.props.name, this.props.module)
    );
  }
});
