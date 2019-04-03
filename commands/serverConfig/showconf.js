exports.run = (client, message, args, guildConf) => {
    const configProps = Object.keys(guildConf).map(prop => {
        return `${prop}  :  ${guildConf[prop]}\n`;
    });
    message.channel.send(`The following are this server's current configuration:
        \`\`\`${configProps}\`\`\``);
    
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['showConf', 'showConfig', 'showconfig'],
    permLevel: 3
};

exports.help = {
    name: 'showconf',
    description: 'Sets ',
    usage: 'showconf {prop} {value}',
};