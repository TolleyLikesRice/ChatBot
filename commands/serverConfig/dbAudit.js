const config = require('../../mainDefs').config;
exports.run = (client, message) => {
    let errorsFixed;
    client.guilds.forEach((guild) => {
        if (client.settings.get(guild.id, 'modRole') == undefined) {}
    });
    message.reply(`Fixed ${errorsFixed} errors`);
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dbFix'],
    permLevel: config.PerServerDB.dbAuditEnable
};
  
exports.help = {
    name: 'dbAudit',
    description: 'Adds all missing server entries from the per server database. (This might fix elevation system errors)',
    usage: 'dbAudit'
};