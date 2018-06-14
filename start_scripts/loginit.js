const winston = require('winston');
const toml = require('toml')
const fs = require('fs')
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
var newfile = false

//Rotates Log File
try {
fs.stat('./logs/dev.log', function (err, stat) {
  if (err == null) {
    var newfile = true
    fs.rename('./logs/dev.log', './logs/olddev.log', function (err) {
      fs.stat('./logs/dev.log', function (err, stats) {
      });
    });
  } else if (err.code == 'ENOENT') {
    // file does not exist
    console.log('Creating new dev.log')
  } else {
    console.log('Some other error: ', err.code);
  }
})
} catch(err) {
  if (err.code == 'ENOENT') {
    console.log('Creating new dev.log')
  }
};

if (config.Logging.debug) {
  function prologtest() {
    winston.loggers.add('prolog', {
      console: {
        level: 'silly',
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
} else {
  //Define logger Prolog
  function prologtest() {
    winston.loggers.add('prolog', {
      console: {
        level: 'warn',
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
}

/*
//Define Logger DevLog
function devlogtest() {
  winston.loggers.add('devlog', {
    console: {
      level: 'silly',
      colorize: 'true',
      label: 'DEBUG'
    }
  })
}
//const devlog = winston.loggers.get('devlog');
//devlog.error('Hi')
*/

module.exports = {
  prologtest: prologtest,
};



prologtest()

if (newfile) {
  const prolog = winston.loggers.get('prolog');
  prolog.info('Hello new log file :)')
}