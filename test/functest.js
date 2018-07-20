/* eslint-env node, mocha */
const expect = require('chai').expect;
const funcs = require('../maindefs');

describe('Check functions/variables from maindefs.js', function () {
  it('Converts txt file to array', function () {
    const array = funcs.textToArray('./config/facts.txt');
    expect(array).to.be.a('array');
  });
  it('Checks if error is thrown when path is not a string', function () {
    expect(funcs.textToArray.bind(funcs, { path: 'Hello World' })).to.throw('Path supplyed is not a string');
  });
  it('Checks if a site is safe', function (done) {
    funcs.checkLink('https://google.com', function (err) {
      if (err) throw err;
    });
    done();
  });
  it('Checks if a unsafe site is safe', function (done) {
    funcs.checkLink('http://malware.wicar.org/data/eicar.com', function (err) {
      if (err) throw err;
    });
    done();
  });
  it('Checks if a site is safe using a invalid service URI', function (done) {
    expect(funcs.checkLink.bind(funcs, 'https://google.com', function (err) {
      if (err) throw err;
    }, 'blah')).to.throw('Invalid URI "blah"');
    done();
  });
  it('Checks if a site is safe using a invalid api key', function (done) {
    expect(funcs.checkLink.bind(funcs, 'https://google.com', function (err, data) {
      if (err) throw err;
      console.log(data);
    }, 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=boop'));
    done();
  });
  it('Checks the config var', function () {
    const config = funcs.config;
    expect(config).to.be.a('object');
  });
  it('Checks the giphy var', function () {
    const giphy = funcs.giphy;
    expect(giphy).to.be.a('object');
  });
});
