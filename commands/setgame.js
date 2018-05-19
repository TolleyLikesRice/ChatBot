exports.run = (client, message, args) => {
  let game = args.join(' ');
  client.user.setGame(game)
  console.log(`Set game to: ${game}`)
  .catch(console.error);
  message.reply(`Set game to: ${game} :yum:`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'setgame',
  description: 'Sets the game that the bot is playing',
  usage: 'setgame <game>'
};