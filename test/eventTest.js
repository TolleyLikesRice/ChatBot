/* eslint-env node, mocha */
const expect = require('chai').expect;
const capcon = require('capture-console');
const config = require('../mainDefs').config;

require('../start_scripts/loginit');
if (config.Logging.debug === true) {
  describe('Events with debug enabled', function () {
  });
} 
if (config.Logging.debug === false) {
  describe('Events with debug disabled', function () {
    it('Prints an warning when disconnect.js is called', function () {
      var stderr = capcon.captureStderr(function scope() {
        require('../events/disconnect');
      });
      expect(stderr).to.contain('[MAIN] You have been disconnected at');
    });
  });
}
