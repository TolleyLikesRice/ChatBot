/* eslint-env node, mocha */
const wtf = require('wtfnode');
const expect = require('chai').expect;
const funcs = require('../mainDefs');

describe('Check functions/variables from mainDefs.js', () => {
    it('Checks if textToArray works correctly', () => {
        const array = funcs.textToArray('./test/testarray.txt');
        const expectedArray = ['item1',
            'item2',
            'item3',
            'item 1 is cool',
            'item 2 is cool',
            'item 3 is cool',
            'You are awesome!',
            'If you are reading this you are probably contributing, if you are thanks!',
            'this is some very long text to see if textToArray breaks when I make it too long blah blah blah I like cake and rice (not together), I dont know why I am telling you that. Why are you even reading this?'];
        expect(array).to.deep.equal(expectedArray);
    });
    it('Checks if error is thrown when path is not a string for textToArray', () => {
        expect(() => funcs.textToArray({ path: 'Hello World' })).to.throw('Path supplied is not a string');
    });
    it('Checks if a safe site is reported as safe', (done) => {
        funcs.checkLink('https://google.com', (err, data, body) => {
            if (err) throw err;
            expect(body).to.deep.equal({});
            done();
        });
    });
    it('Checks if a unsafe site is reported as safe', (done) => {
        funcs.checkLink('http://malware.wicar.org/data/eicar.com', (err) => {
            if (err) throw err;
            done();
        });
    
    });
    it('Checks if an error if thrown when checking a site using a invalid service URI', (done) => {
        expect(funcs.checkLink.bind(funcs, 'http://malware.wicar.org/data/eicar.com', (err) => {
            if (err) throw err;
        }, 'blah')).to.throw('Invalid URI "blah"');
        done();
    });
    it('Checks if the Google Safe Browsing API returns an error when an invalid API key is used', (done) => {
        expect(funcs.checkLink('http://malware.wicar.org/data/eicar.com', (err, data, body) => {
            expect(body.error.message).to.contain('API key not valid');
            done();
        }, 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=boop'));
   
    });
    it('Checks the config var', () => {
        const config = funcs.config;
        expect(config).to.be.a('object');
    });
    it('Checks the giphy var', () => {
        const giphy = funcs.giphy;
        expect(giphy).to.be.a('object');
    });
});
wtf.dump();