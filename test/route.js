'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-sys-angular:route', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/route'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/app/modules/default/default.route.js'
    ]);
  });
});
