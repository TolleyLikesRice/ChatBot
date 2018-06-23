exports.run = (client, message) => {
  const funcs = require('../../defs');
  var responces = funcs.textToArray('../../config/facts.txt');
  var show = responces[Math.floor(Math.random() * responces.length)];
  message.reply(show);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: '8ball',
  description: 'Ask the magic 8 ball',
  usage: '8ball <question>'
};