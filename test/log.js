const expect = require('chai').expect
const loginit = require('../loginit')
const winston = require('winston')
const capcon = require('capture-console');

//Changes Debug to true
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/settings.json`)
file.set("debug", true)

describe('Winston Define', function () {
    it('Define prolog', function () {
        loginit.prologtest()
    });

    it('Define devlog', function () {
        loginit.devlogtest()
    });
});
require('../loginit')
const prolog = winston.loggers.get('prolog');
const devlog = winston.loggers.get('devlog');
describe('Winston Logging', function () {
    it('Print an error to prolog', function () {
        var stderr = capcon.captureStderr(function scope() {
            prolog.error('Error Test')
        });
        expect(stderr).to.equal('error: [MAIN] Error Test\r\n')
    });

    it('Print a warning to prolog', function () {
        var stdout = capcon.captureStdout(function scope() {
            prolog.warn('Warn Test')
        });
        expect(stdout).to.equal('warn: [MAIN] Warn Test\r\n')
    });

    it('Print silly to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.silly('Silly Test')
        });
        expect(stdout).to.equal('silly: [DEBUG] Silly Test\r\n')
    });

    it('Print debug to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.debug('Debug Test')
            console.log('Hello World :)')
        });
        expect(stdout).to.equal('debug: [DEBUG] Debug Test\r\n')
        devlog.debug('Debug Test')
    });

    it('Print vebose to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.verbose('Verbose Test')
        });
        expect(stdout).to.equal('verbose: [DEBUG] Verbose Test\r\n')
    });

    it('Print info to devlog', function () {
        var stdout = capcon.captureStdout(function scope() {
            devlog.info('Info Test')
        });
        expect(stdout).to.equal('info: [DEBUG] Info Test\r\n')
    });
});