const Discord = require('discord.js');
const config = require('../../mainDefs').config;
const winston = require('winston');
const main = winston.loggers.get('main');

exports.run = (client, message, args) => {
    const reason = args[1];
    const user = message.mentions.users.first();
    const modlog = config.Moderation.logid;
    if (modlog.length < 1) return message.reply('I cannot find a log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(main.error);

    if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
    message.guild.ban(user, 2);
    main.info(`New Ban: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
    const embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTimestamp()
        .addField('Action:', 'Ban')
        .addField('User:', `${user.tag} (${user.id})`)
        .addField('Moderator:', `${message.author.tag}`)
        .addField('Reason', reason); return client.channels.get(modlog).send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: config.Moderation.banlevel
};

exports.help = {
    name: 'ban',
    description: 'Bans the mentioned user.',
    usage: 'ban <mention> <reason>'
};
