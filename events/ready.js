const chalk = require('chalk');
var logger = require('winston'); // this retrieves default logger which was configured in log.js
module.exports = (client, guild) => {
    console.log(chalk.green('Connected!'));
    client.user.setActivity('Type ;help', { type: 'PLAYING' });
    logger.info("the default logger with my tricked out transports is rockin this module");
};
