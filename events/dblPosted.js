const winston = require('winston');
const main = winston.loggers.get('main');

module.exports = () => {
    main.verbose('Posted stats to Discord Bots List');
};