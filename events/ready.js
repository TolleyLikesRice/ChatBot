const chalk = require('chalk');
module.exports = client => {
    client.user.setActivity('Type ;help', { type: 'PLAYING' });
    console.log(chalk.green('Connected!'));
};