const Discord = require('discord.js');
const config = require('../../mainDefs').config;
const winston = require('winston');
const main = winston.loggers.get('main');
exports.run = (client, message, args) => {
    const reason = args.slice(1).join(' ');
    const user = message.mentions.users.first();
    const modlog = config.Moderation.logid;
    if (modlog.length < 1) return message.reply('I cannot find a log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(main.error);
    main.verbose(`New Warn: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
    const embed = new Discord.RichEmbed()
        .setColor('#ffff26')
        .setTimestamp()
        .addField('Action:', 'Warn')
        .addField('User:', `${user.tag} (${user.id})`)
        .addField('Moderator:', `${message.author.tag}`)
        .addField('Reason', reason);
    return client.channels.get(modlog).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: config.Moderation.warnlevel
};

exports.help = {
    name: 'warn',
    description: 'Issues a warning to the mentioned user.',
    usage: 'warn <mention> <reason>'
};
