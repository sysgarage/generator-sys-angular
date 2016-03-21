'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-sys-angular:service', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/service'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/app/services/default.service.js'
    ]);
  });
});
