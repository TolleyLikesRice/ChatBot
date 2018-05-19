const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let modlog = settings.logid
  if (modlog.length < 1) return message.reply('I cannot find a log channel');
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
  console.log(`New Purge: Moderator: ${message.author.tag} Messages Deleted: ${messagecount}`)
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
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Deletes X amount of messages from a given channel.',
  usage: 'purge <number>'
};