/* eslint no-inner-declarations: 0 */
const winston = require('winston');
const fs = require('fs');
const config = require('../mainDefs').config;
var newfile = false;

//Rotates Log File
try {
    fs.accessSync('etc/passwd', fs.constants.R_OK | fs.constants.W_OK);
    newfile = true;
    fs.renameSync('./logs/main.log', './logs/oldmain.log');
} catch (err) {
    console.log('Creating new main.log');
    if (!fs.existsSync('./logs')){
        fs.mkdirSync('./logs');
    }
}

if (config.Logging.debug) {
    function maintest() {
        winston.loggers.add('main', {
            console: {
                level: 'silly',
                colorize: true,
                label: 'MAIN',
                json: false
            },
            file: {
                filename: './logs/main.log',
                level: 'silly',
                json: false,
                timestamp: true
            },
        });
    }
    module.exports = {
        maintest: maintest,
    };
    maintest();
} else {
    //Define logger main
    function maintest() {
        winston.loggers.add('main', {
            console: {
                level: 'warn',
                colorize: true,
                label: 'MAIN',
                json: false
            },
            file: {
                filename: './logs/main.log',
                level: 'silly',
                json: false,
                timestamp: true
            },
        });
    }
    module.exports = {
        maintest: maintest,
    };
    maintest();
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







if (newfile) {
    const main = winston.loggers.get('main');
    main.info('Hello new log file :)');
}