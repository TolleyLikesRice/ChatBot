const winston = require('winston');
const settings = require('./settings.json');
const fs = require('fs')
var newfile = false

//Rotates Log File
fs.stat('dev.log', function (err, stat) {
  if (err == null) {
    console.log('File exists');
    var newfile = true
    fs.rename('./logs/dev.log', './logs/olddev.log', function (err) {
      fs.stat('dev.log', function (err, stats) {
      });
    });
  } else if (err.code == 'ENOENT') {
    // file does not exist
    console.log('Creating new dev.log')
  } else {
    console.log('Some other error: ', err.code);
  }
});
//Define colours
const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    yay: 2,
    info: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  colors: {
    error: 'bold red whiteBG',
    warn: 'bold yellow',
    yay: 'green',
    info: 'white',
    verbose: 'cyan',
    debug: 'magenta',
    silly: 'gray'
  }
};

winston.addColors(myCustomLevels.colors);

//Define logger Prolog
function prologtest() {
  winston.loggers.add('prolog', {
    levels: myCustomLevels.levels,
    console: {
      level: 'yay',
      colorize: true,
      label: 'MAIN',
      json: false
    },
    file: {
      filename: './logs/dev.log',
      level: 'silly',
      json: false,
      timestamp: true
    },
  });
}

//Define Logger DevLog
/*function devlogtest() {
  if (settings.debug == true) {
    winston.loggers.add('devlog', {
      levels : myCustomLevels,
      console: {
        level: 'silly',
        colorize: 'true',
        label: 'DEBUG'
      }
    })
  }
}*/
//const devlog = winston.loggers.get('devlog');
//devlog.error('Hi')

module.exports = {
  prologtest: prologtest,
  devlogtest: prologtest
};



prologtest()
devlogtest()

if (newfile = true) {
  const prolog = winston.loggers.get('prolog');
  prolog.info('Hello new log file :)')
}