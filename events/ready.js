const chalk = require('chalk');
const winston = require('winston');
const main = winston.loggers.get('main');
const config = require('../mainDefs').config;
module.exports = client => {
    main.info(chalk.green('Connected!'));
    client.user.setActivity(config.Botcmd.bootgame, { type: 'PLAYING' });
    //Check every guild has a enmap config
    client.guilds.forEach(guild => {
    // For this guild, check if enmap has its guild conf
        if(!client.settings.has(guild.id)) {
            // add it if it's not there, add it!
            client.settings.set(guild.id, client.defaultSettings);
        }
    });
};
