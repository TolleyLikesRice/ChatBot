const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = () => {
    main.warn('Reconnecting at ' + new Date());
};