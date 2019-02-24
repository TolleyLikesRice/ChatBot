const winston = require('winston');
const main = winston.loggers.get('main');
console.log('1');
module.exports = () => {
    main.warn('You have been disconnected at ' + new Date());
    console.log('2');
};