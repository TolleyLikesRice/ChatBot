const Discord = require('discord.js');
const config = require('../../mainDefs').config;
const winston = require('winston');
const main = winston.loggers.get('main');
exports.run = (client, message, args) => {
    const reason = args.slice(1).join(' ');
    const user = message.mentions.users.first();
    const modlog = config.Moderation.logid;
    const muteRole = client.guilds.get(message.guild.id).roles.find(role => role.name == 'muted');
    if (!modlog) return message.reply('I cannot find a log channel').catch(main.error);
    if (!muteRole) return message.reply('I cannot find a muted role').catch(main.error);
    if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(main.error);
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(main.error);
    main.log(`New Unmute/Mute: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
    const embed = new Discord.RichEmbed()
        .setColor('#26ff46')
        .setTimestamp()
        .addField('Action:', 'Mute')
        .addField('User:', `${user.tag} (${user.id})`)
        .addField('Moderator:', `${message.author.tag}`)
        .addField('Reason', reason);
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(main.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
        message.guild.member(user).removeRole(muteRole).then(() => {
            client.channels.get(modlog).send({ embed }).catch(main.error);
        });
    } else {
        message.guild.member(user).addRole(muteRole).then(() => {
            client.channels.get(modlog).send({ embed }).catch(main.error);
        });
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unmute'],
    permLevel: config.Moderation.mutelevel
};

exports.help = {
    name: 'mute',
    description: 'Mutes or unmutes a mentioned user',
    usage: 'un/mute <mention> <reason>'
};
