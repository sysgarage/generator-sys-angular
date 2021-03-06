'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var filters = require(path.join(__dirname, '../../utils/filters.js'));
var convert = require(path.join(__dirname, '../../utils/convert.js'));
var context = require(path.join(__dirname, '../../utils/context.js'));

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('path', {
      required: false
    });
    this.argument('name', {
      required: false
    });

    if (this.path) {
      if (this.name) {
        this.path = path.resolve(this.path, '..'); 
      }
      this.module = convert.pathToModule(this.path);
      this.name = this.name || path.basename(this.path);
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
      message: 'Enter the service name:',
      default: 'default',
      when: !this.module
    }, {
      type: 'input',
      name: 'module',
      message: 'Enter the module name:',
      default: 'app.services',
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
    var destinationFolder;
    if (this.path) {
      destinationFolder = path.resolve(this.path) + '/';
    } else {
      destinationFolder = 'src/' + convert.moduleToFolder(this.props.module);
    }

    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(destinationFolder + _.kebabCase(this.props.name) + '.service.js'),
      context.getDefaults(this.props.name, this.props.module)
    );
  }
});
