const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.green('Connected!'));
  client.user.setActivity('Type ;help', { type: 'PLAYING' });
};
