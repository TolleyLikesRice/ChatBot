const winston = require('winston');
const settings = require('./settings.json');

winston.loggers.add('prolog', {
  console: {
    level: 'warn',
    colorize: 'true',
    label: 'MAIN'
  },
  file: {
    filename: './dev.log',
    level: 'silly',
    json: false,
    timestamp: true
  },
});
const prolog = winston.loggers.get('prolog');
prolog.info('Log Initilized');

if (settings.debug = true) {
    winston.loggers.add('devlog', {
        console: {
            level: 'silly',
            colorize: 'true',
            label: 'DEBUG'
        }
    })
}
const devlog = winston.loggers.get('devlog');
devlog.error('Hi')