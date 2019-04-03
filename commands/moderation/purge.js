const Discord = require('discord.js');
const config = require('../../mainDefs').config;
const winston = require('winston');
const main = winston.loggers.get('main');
exports.run = (client, message, args) => {
    const modlog = config.Moderation.logid;
    if (modlog.length < 1) return message.reply('I cannot find a log channel');
    const messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
    main.verbose(`New Purge: Moderator: ${message.author.tag} Messages Deleted: ${messagecount}`);
    const embed = new Discord.RichEmbed()
        .setColor('#26ff46')
        .setTimestamp()
        .addField('Action:', 'Purge')
        .addField('Moderator:', `${message.author.tag}`) 
        .addField('Messages Deleted', `${messagecount}`);
    return client.channels.get(modlog).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: config.Moderation.purgelevel
};

exports.help = {
    name: 'purge',
    description: 'Deletes X amount of messages from a given channel.',
    usage: 'purge <number>'
};