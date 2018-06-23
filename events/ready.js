const chalk = require('chalk');
const config = require('../defs').config;
module.exports = client => {
  console.log(chalk.green('Connected!'));
  client.user.setActivity(config.Botcmd.bootgame, { type: 'PLAYING' });
};
