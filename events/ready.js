const chalk = require('chalk');
const winston = require('winston');
const main = winston.loggers.get('main');
const config = require('../mainDefs').config;
module.exports = client => {
    main.info(chalk.green('Connected!'));
    client.user.setActivity(config.Botcmd.bootgame, { type: 'PLAYING' });
};
