const winston = require('winston')
const prolog = winston.loggers.get('prolog');
module.exports = client => {
    prolog.warn('Reconnecting at ' + new Date());
};