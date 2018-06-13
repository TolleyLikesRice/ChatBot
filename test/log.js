const expect = require('chai').expect
const winston = require('winston')
const capcon = require('capture-console');
const config = require('../defs/definetests').config
const loginit = require('../start_scripts/loginit')


describe('Winston Define', function () {
    it('Define prolog', function () {
        loginit.prologtest()
    });
});
require('../start_scripts/loginit')
const prolog = winston.loggers.get('prolog');
if (config.Logging.debug === true) {
    describe('Winston Prolog Debug', function () {
        it('Print an error to prolog', function () {
            var stderr = capcon.captureStderr(function scope() {
                prolog.error('Error Test')
            });
            expect(stderr).to.contain('[MAIN] Error Test')
        });

        it('Print a warning to prolog', function () {
            var stdout = capcon.captureStdout(function scope() {
                prolog.warn('Warn Test')
            });
            expect(stdout).to.contain('[MAIN] Warn Test')
        });
        it('Print info to prolog', function () {
            var stdout = capcon.captureStdout(function scope() {
                prolog.info('Info Test')
            });
            expect(stdout).to.contain('[MAIN] Info Test')
        });

        /* it('Print debug to prolog', function () {
             var stdout = capcon.captureStdout(function scope() {
                 prolog.debug('Debug Test')
                 console.log('Hello World :)')
             });
             expect(stdout).to.contain('debug: [DEBUG] Debug Test\r\n')
      });*/

        it('Print vebose to prolog', function () {
            var stdout = capcon.captureStdout(function scope() {
                prolog.verbose('Verbose Test')
            });
            expect(stdout).to.contain('[MAIN] Verbose Test')
        });


        it('Print silly to prolog', function () {
            var stdout = capcon.captureStdout(function scope() {
                prolog.silly('Silly Test')
            });
            expect(stdout).to.contain('[MAIN] Silly Test')
        });
    });
} 
if (config.Logging.debug === false) {
    describe('Winston Prolog', function () {
        it('Print an error to prolog', function () {
            var stderr = capcon.captureStderr(function scope() {
                prolog.error('Error Test')
            });
            expect(stderr).to.contain('[MAIN] Error Test')
        });

        it('Print a warning to prolog', function () {
            var stdout = capcon.captureStdout(function scope() {
                prolog.warn('Warn Test')
            });
            expect(stdout).to.contain('[MAIN] Warn Test')
        });
    })
}
