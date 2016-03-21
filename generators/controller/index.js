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
      name: 'name',
      message: 'Enter the controller name:',
      default: 'default'
    }, {
      type: 'input',
      name: 'module',
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
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);

    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.controller.js'),
      context.getDefaults(this.props.name, this.props.module)
    );
  }
});
