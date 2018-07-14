const chalk = require('chalk');
const winston = require('winston');
const prolog = winston.loggers.get('prolog');
const config = require('../maindefs').config;
module.exports = client => {
  prolog.info(chalk.green('Connected!'));
  client.user.setActivity(config.Botcmd.bootgame, { type: 'PLAYING' });
};
