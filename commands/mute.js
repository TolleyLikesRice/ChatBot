const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = settings.logid
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!modlog) return message.reply('I cannot find a log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a muted role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  console.log(`New Unmute/Mute: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
  const embed = new Discord.RichEmbed()
    .setColor("#26ff46")
    .setTimestamp()
    .addField('Action:', 'Mute')
    .addField('User:', `${user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag}`)
    .addField('Reason', reason);
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog).send({ embed }).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog).send({ embed }).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mutes or unmutes a mentioned user',
  usage: 'un/mute <mention> <reason>'
};
