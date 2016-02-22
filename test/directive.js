'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-sys-angular:directive', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/directive'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/app/directives/sys-default/sys-default.module.js',
      'src/app/directives/sys-default/sys-default.directive.js',
      'src/app/directives/sys-default/sys-default.directive.jade'
    ]);
  });
});
