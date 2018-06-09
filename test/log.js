const expect = require('chai').expect
const winston = require('winston')
const capcon = require('capture-console');
const config = require('../defs/definetests').config
const loginit = require('../start_scripts/loginit')


describe('Winston Define', function () {
    it('Define prolog', function () {
        loginit.prologtest()
    });

    it('Define devlog', function () {
        loginit.devlogtest()
    });
});
require('../start_scripts/loginit')
const prolog = winston.loggers.get('prolog');
const devlog = winston.loggers.get('devlog');
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
if (config.Logging.debug == true) {
describe('Winston Devlog', function () {
    it('Print info to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.info('Info Test')
        });
        expect(stdout).to.contain('info: [DEBUG] Info Test')
    });

    /* it('Print debug to devlog', function () {
         var stdout = capcon.captureStdout(function scope() {
             devlog.debug('Debug Test')
             console.log('Hello World :)')
         });
         expect(stdout).to.contain('debug: [DEBUG] Debug Test\r\n')
  });*/

    it('Print vebose to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.verbose('Verbose Test')
        });
        expect(stdout).to.contain('verbose: [DEBUG] Verbose Test')
    });


    it('Print silly to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.silly('Silly Test')
        });
        expect(stdout).to.contain('silly: [DEBUG] Silly Test')
    });
});
}