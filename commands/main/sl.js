const config = require('../../mainDefs').config;
exports.run = (client, message) => {
    message.reply(`Servers (${client.guilds.array().length} servers):`);
    client.guilds.forEach((guild) => {
        message.channel.send(' - ' + guild.name);
    });
    message.channel.send('Done!');
};
  
exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['sl'],
    permLevel: config.Botcmd.serverlistlevel
};
  
exports.help = {
    name: 'serverlist',
    description: 'Lists all the servers that the bot is connected to.',
    usage: 'serverlist <game>'
};
