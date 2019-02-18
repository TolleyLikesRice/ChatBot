const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = () => {
  prolog.warn('You have been disconected at ' + new Date());
};