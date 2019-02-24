const log4js = require('log4js');
const fs = require('fs');
const config = require('../mainDefs').config;
const logdir = './logs';
let consoleLevel = null;

try {
    fs.statSync(logdir);
} catch (e) {
    fs.mkdirSync(logdir);
}

if (config.Logging.debug === false) {
    consoleLevel = 'info';
} else {
    consoleLevel = 'debug';
}
log4js.configure({
    appenders: {
        mainFile: { type: 'dateFile', filename: './logs/main.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
        console: { type: 'logLevelFilter', appender: 'stdout', level: consoleLevel },
    },
    categories: {
        default: {
            appenders: ['console', 'mainFile'],
            level: 'trace'
        }
    }
});