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
      message: 'Enter the route name:',
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
    var folderName = convert.moduleToFolder(this.props.module);
    var destinationFolder = 'src/' + folderName;
    var context = {
      module: this.props.module,
      controller: _.upperFirst(_.camelCase(this.props.name)) + 'Controller',
      route: _.camelCase(this.props.name) + 'Route',
      state: this.props.module.replace('app.modules.', ''),
      url: _.kebabCase(this.props.name),
      templateUrl: folderName + _.kebabCase(this.props.name) + '.html'
    };

    this.fs.copyTpl(
      this.templatePath('route.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.route.js'),
      context
    );
  }
});
