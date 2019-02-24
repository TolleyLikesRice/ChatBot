const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = guild => {
    main.info(`I just joined a discord server called: ${guild.name}`);
};