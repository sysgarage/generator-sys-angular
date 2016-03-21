'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-sys-angular:module', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/module'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/app/modules/default/default.module.js'
    ]);
  });
});
