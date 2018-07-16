/* eslint-env node, mocha */
const expect = require('chai').expect;
const funcs = require('../maindefs');

describe('Check functions/variables from maindefs.js', function() {
  it('Converts txt file to array', function() {
    const array = funcs.textToArray('./config/facts.txt');
    expect(array).to.be.a('array');
  });
  it('Checks the config var', function() {
    const config = funcs.config;
    expect(config).to.be.a('object');
  });
  it('Checks the giphy var', function() {
    const giphy = funcs.giphy;
    expect(giphy).to.be.a('object');
  });
});
