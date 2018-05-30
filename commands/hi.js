const winston = require('winston')
const prolog = winston.loggers.get('prolog')
exports.run = (client, message) => {
    var guildmembers = message.guild.memberCount
    message.reply(`Members: ${guildmembers}`)
    message.channel.edit({ name: `Guild Members: ${guildmembers}` })
  .then(prolog.verbose)
  .catch(prolog.error);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'hi',
    description: 'hi',
    usage: 'hi <question>'
  };