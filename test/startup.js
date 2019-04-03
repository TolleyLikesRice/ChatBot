/* eslint-env node, mocha */
const wtf = require('wtfnode');
const fs = require('fs');
const expect = require('chai').expect;
fs.writeFileSync('./test.txt', 'Test active. When test completed please delete this file. :)');
const appjs = require('../app.js');
require('../start_scripts/');

describe('Bot Startup', () => {
    it('Initalize', () => {
        appjs.inittest();
    });
    it('Load main module', () => {
        appjs.loadModule('main');
    });
    it('Load moderation module', () => {
        appjs.loadModule('moderation');
    });
    it('Load fun module', () => {
        appjs.loadModule('fun');
    });
    it('Load serverConfig module', () => {
        appjs.loadModule('serverConfig');
    });
    it('Load giphy module', () => {
        appjs.loadModule('giphy');
    });
    it('Get error on load of a fake module', () => {
        expect(appjs.loadModule.bind(appjs, 'fake')).to.throw('Module Load Error');
    });
    it('Elevate Roles', () => {
        appjs.eletest();
    });
    it('Cleaning up', () => {
        fs.unlink('./test.txt', (err) => {
            if (err) throw err;
        });
    });
});
wtf.dump();