exports.run = (client, message, args) => {
    const value = args;
    const prop = value.shift();
    
    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
    if(!client.settings.has(message.guild.id, prop)) {
        return message.reply('This key is not in the configuration.');
    }
    
    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, value.join(' '), prop);
    
    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item \`${prop}\` has been changed to:\n\`${value.join(' ')}\``);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['setConf', 'setConfig', 'setconfig'],
    permLevel: 3
};

exports.help = {
    name: 'setconf',
    description: 'Sets ',
    usage: 'setconf {prop} {value}',
};