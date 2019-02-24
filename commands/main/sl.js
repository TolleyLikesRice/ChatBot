const config = require('../../mainDefs').config;
exports.run = (client, message) => {
  message.reply('Servers:');
  client.guilds.forEach((guild) => {
    message.channel.send(' - ' + guild.name);
  });
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sl'],
  permLevel: config.Botcmd.serverlistlevel
};
  
exports.help = {
  name: 'serverlist',
  description: 'Lists all the servers that the bot is connected to.',
  usage: 'serverlist <game>'
};