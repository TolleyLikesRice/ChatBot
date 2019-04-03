/* eslint-env node, mocha */
const wtf = require('wtfnode');
const expect = require('chai').expect;
const winston = require('winston');
const capcon = require('capture-console');
const config = require('../mainDefs').config;
const loginit = require('../start_scripts/loginit');


describe('Winston Define', () => {
    it('Define main', () => {
        loginit.maintest();
    });
});
require('../start_scripts/loginit');
const main = winston.loggers.get('main');
if (config.Logging.debug === true) {
    describe('Winston main Debug', () => {
        it('Print an error to main', () => {
            var stderr = capcon.captureStderr(() => {
                main.error('Error Test');
            });
            expect(stderr).to.contain('[MAIN] Error Test');
        });

        it('Print a warning to main', () => {
            var stdout = capcon.captureStdout(() => {
                main.warn('Warn Test');
            });
            expect(stdout).to.contain('[MAIN] Warn Test');
        });
        it('Print info to main', () => {
            var stdout = capcon.captureStdout(() => {
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

        it('Print vebose to main', () => {
            var stdout = capcon.captureStdout(() => {
                main.verbose('Verbose Test');
            });
            expect(stdout).to.contain('[MAIN] Verbose Test');
        });


        it('Print silly to main', () => {
            var stdout = capcon.captureStdout(() => {
                main.silly('Silly Test');
            });
            expect(stdout).to.contain('[MAIN] Silly Test');
        });
    });
} 
if (config.Logging.debug === false) {
    describe('Winston main', () => {
        it('Print an error to main', () => {
            var stderr = capcon.captureStderr(() => {
                main.error('Error Test');
            });
            expect(stderr).to.contain('[MAIN] Error Test');
        });

        it('Print a warning to main', () => {
            var stdout = capcon.captureStdout(() => {
                main.warn('Warn Test');
            });
            expect(stdout).to.contain('[MAIN] Warn Test');
        });
    });
}
wtf.dump();
