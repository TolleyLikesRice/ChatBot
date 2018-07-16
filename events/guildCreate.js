const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = guild => {
  prolog.info(`I just joined a discord server called: ${guild.name}`);
};