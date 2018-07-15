const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = () => {
  prolog.warn('Reconnecting at ' + new Date());
};