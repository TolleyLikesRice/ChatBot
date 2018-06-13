const fs = require('fs');
fs.writeFileSync('./test.txt', 'Test active. When test completed please delete this file. :)')
const appjs = require('../app.js')
require('../start_scripts/')

describe('Bot Startup', function () {
  it('Initalize', function () {
    appjs.inittest()
  });

  it('Init Commands', function () {
    appjs.cmdtest()
  });

  it('Elevate Roles', function () {
    appjs.eletest()
    process.exit
  });
  it('Cleaning up', function () {
    fs.unlink('./test.txt', (err) => {
      if (err) throw err;
    });
  })
});