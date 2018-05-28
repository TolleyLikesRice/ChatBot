var winston = require('winston');
var logger = require('winston');
logger.add(winston.transports.File, { filename: "./logs/latest.log",  });
logger.info('Chill Winston, the logs are being captured 3 ways- console, file, and Loggly');
module.exports = logger;