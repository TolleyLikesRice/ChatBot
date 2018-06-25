const config = require('../../maindefs').config;
const winston = require('winston');
const prolog = winston.loggers.get('prolog');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let modlog = config.Moderation.logid;
  if (modlog.length < 1) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(prolog.error);
  message.guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: config.Moderation.unbanlevel
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban <mention> <reason>'
};
