const config = require('../../mainDefs').config;
exports.run = (client, message, args) => {
  let game = args.join(' ');
  client.user.setActivity(game, { type: 'PLAYING' });
  message.reply(`Set game to: ${game} :yum:`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: config.Botcmd.setgamelevel
};

exports.help = {
  name: 'setgame',
  description: 'Sets the game that the bot is playing',
  usage: 'setgame <game>'
};