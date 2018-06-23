const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = client => {
  prolog.warn('You have been disconected at ' + new Date());
};