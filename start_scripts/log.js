const log4js = require('log4js');
const fs = require('fs');
const config = require('../maindefs').config;
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
    stdout: { type: 'stdout' },
    mainFile: { type: 'dateFile', filename: './logs/main.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
    botFile: { type: 'dateFile', filename: './logs/bot.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
    controllerFile: { type: 'dateFile', filename: './logs/controller.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
    commandFile: { type: 'dateFile', filename: './logs/command.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
    eventFile: { type: 'dateFile', filename: './logs/event.log', pattern: '-yyyy-MM-dd', daysToKeep: 2, keepFileExt: true },
    console: { type: 'logLevelFilter', appender: 'stdout', level: consoleLevel },
  },
  categories: {
    default: {
      appenders: ['console', 'mainFile'],
      level: 'trace'
    },
    bot: {
      appenders: ['console','mainFile', 'botFile'],
      level: 'trace'
    },
    mongo_controller: {
      appenders: ['console','mainFile', 'controllerFile'],
      level: 'trace'
    },
    commands: {
      appenders: ['console','mainFile', 'commandFile'],
      level: 'trace'
    },
    events: {
      appenders: ['console','mainFile', 'eventFile'],
      level: 'trace'
    }
  }
});