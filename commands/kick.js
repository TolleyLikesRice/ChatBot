const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = settings.logid
  if (modlog.length < 1) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();
  console.log(`New Kick: Target:${user.tag} Moderator:${message.author.tag} Reason:${reason}`);
  const embed = new Discord.RichEmbed()
    .setColor("#ffff26")
    .setTimestamp()
    .addField('Action:', 'Kick')
    .addField('User:', `${user.tag} (${user.id})`)
    .addField('Moderator:', `${message.author.tag}`)
    .addField('Reason', reason);  
    return client.channels.get(modlog).send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick <mention> <reason>'
};
