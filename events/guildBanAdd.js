const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = (guild, user) => {
  prolog.verbose(`${user.tag} (${user.id})was just banned!`);
};