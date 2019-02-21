const winston = require('winston');
const prolog = winston.loggers.get('prolog');
console.log('1');
module.exports = () => {
  prolog.warn('You have been disconnected at ' + new Date());
  console.log('2');
};