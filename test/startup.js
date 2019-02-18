/* eslint-env node, mocha */
const fs = require('fs');
const expect = require('chai').expect;
fs.writeFileSync('./test.txt', 'Test active. When test completed please delete this file. :)');
const appjs = require('../app.js');
require('../start_scripts/');

describe('Bot Startup', function () {
  it('Initalize', function () {
    appjs.inittest();
  });
  it('Load main module', function () {
    appjs.loadModule('main');
  });
  it('Load moderation module', function () {
    appjs.loadModule('moderation');
  });
  it('Load fun module', function () {
    appjs.loadModule('fun');
  });
  it('Load stats module', function () {
    appjs.loadModule('stats');
  });
  it('Load giphy module', function () {
    appjs.loadModule('giphy');
  });
  it('Get error on load of a fake module', function () {
    expect(appjs.loadModule.bind(appjs, 'fake')).to.throw('Module Load Error');
  });
  it('Elevate Roles', function () {
    appjs.eletest();
  });
  it('Cleaning up', function () {
    fs.unlink('./test.txt', (err) => {
      if (err) throw err;
    });
  });
});