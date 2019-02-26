/* eslint-env node, mocha */
const wtf = require('wtfnode');
const expect = require('chai').expect;
const winston = require('winston');
const capcon = require('capture-console');
const config = require('../mainDefs').config;
const loginit = require('../start_scripts/loginit');


describe('Winston Define', function () {
    it('Define main', function () {
        loginit.maintest();
    });
});
require('../start_scripts/loginit');
const main = winston.loggers.get('main');
if (config.Logging.debug === true) {
    describe('Winston main Debug', function () {
        it('Print an error to main', function () {
            var stderr = capcon.captureStderr(function scope() {
                main.error('Error Test');
            });
            expect(stderr).to.contain('[MAIN] Error Test');
        });

        it('Print a warning to main', function () {
            var stdout = capcon.captureStdout(function scope() {
                main.warn('Warn Test');
            });
            expect(stdout).to.contain('[MAIN] Warn Test');
        });
        it('Print info to main', function () {
            var stdout = capcon.captureStdout(function scope() {
                main.info('Info Test');
            });
            expect(stdout).to.contain('[MAIN] Info Test');
        });

        /* it('Print debug to main', function () {
             var stdout = capcon.captureStdout(function scope() {
                 main.debug('Debug Test')
                 console.log('Hello World :)')
             });
             expect(stdout).to.contain('debug: [DEBUG] Debug Test\r\n')
      });*/

        it('Print vebose to main', function () {
            var stdout = capcon.captureStdout(function scope() {
                main.verbose('Verbose Test');
            });
            expect(stdout).to.contain('[MAIN] Verbose Test');
        });


        it('Print silly to main', function () {
            var stdout = capcon.captureStdout(function scope() {
                main.silly('Silly Test');
            });
            expect(stdout).to.contain('[MAIN] Silly Test');
        });
    });
} 
if (config.Logging.debug === false) {
    describe('Winston main', function () {
        it('Print an error to main', function () {
            var stderr = capcon.captureStderr(function scope() {
                main.error('Error Test');
            });
            expect(stderr).to.contain('[MAIN] Error Test');
        });

        it('Print a warning to main', function () {
            var stdout = capcon.captureStdout(function scope() {
                main.warn('Warn Test');
            });
            expect(stdout).to.contain('[MAIN] Warn Test');
        });
    });
}
wtf.dump()
