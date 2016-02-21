'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var filters = require('../../utils/filters.js');
var convert = require('../../utils/convert.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the route name:',
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
    var folderName = convert.moduleToFolder(this.props.moduleName);
    var destinationFolder = 'src/' + folderName;
    var context = {
      moduleName: this.props.moduleName,
      controllerName: _.upperFirst(_.camelCase(this.props.name)) + 'Controller',
      routeName: _.camelCase(this.props.name) + 'Route',
      state: this.props.moduleName.replace('app.modules.', ''),
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
