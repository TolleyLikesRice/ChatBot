const Discord = require('discord.js');
const config = require('../../defs/defineconfig').config;
const winston = require('winston')
const prolog = winston.loggers.get('prolog');
exports.run = (client, message, args) => {
  let modlog = config.Moderation.logid
  if (modlog.length < 1) return message.reply('I cannot find a log channel');
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
  prolog.verbose(`New Purge: Moderator: ${message.author.tag} Messages Deleted: ${messagecount}`)
  const embed = new Discord.RichEmbed()
  .setColor("#26ff46")
  .setTimestamp()
  .addField('Action:', 'Purge')
  .addField('Moderator:', `${message.author.tag}`) 
  .addField('Messages Deleted', `${messagecount}`)
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