/* eslint no-undef: 0 */
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
if (funcs.config.PerServerDB.enable === true) {
  const fb = require('../fbdefs');
  describe('Check functions/variables from maindefs.js', function() {
    it('Inits firebase', function() {
      fb.init('firebasekey.json');
    });
    it('Adds a document', function(done) {
      fb.addDoc('test', {
        info: 'This data is for a test',
        todo: 'delete this collection'
      });
      done();
    });
    it('Sets a document', function() {
      fb.setDoc('test', 'tests', {
        info: 'This data is for a test',
        todo: 'delete this collection'
      });
    });
    it('Checks if the document tests exists', function() {
      fb.docExists('test', 'tests');
    });
    it('Logs all documents', function() {
      fb.listDocs('test');
    });
  });
}
