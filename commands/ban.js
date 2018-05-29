const Discord = require('discord.js');
const settings = require('../settings.json');
const winston = require('winston')
const prolog = winston.loggers.get('prolog');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = settings.logid
  if (modlog.length < 1) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);
  prolog.info(`New Ban: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
  const embed = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag}`)
    .addField('Reason', reason);  return client.channels.get(modlog).send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban <mention> <reason>'
};
