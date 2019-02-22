const config = require('../mainDefs').config;
const checkLink = require('../mainDefs').checkLink;
const getUrls = require('get-urls');
const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = message => {
  let client = message.client;
  let urls = Array.from(getUrls(message.content));
  if (urls !== []) {
    urls.forEach(url => {
      checkLink(url, function (err, data) {
        if (err !== null) {
          client.users.get('251055152667164676').send(`There was an error while User <@${message.author.id}> (${message.author.username}#${message.author.discriminator}) message was being scanned in Guild <@${message.guild.id}> (${message.guild.name}) It was a \`${err.code}\` error with the message \`${err.message}\`.\nThe body is:\n\`\`\`${JSON.stringify(err)}\`\`\``);
          prolog.warn(`There was an error while User ${message.author.id} (${message.author.username}#${message.author.discriminator}) message was being scanned in Guild ${message.guild.id} (${message.guild.name}) It was a ${err.code} error with the message ${err.message}.\nThe body is:\n${JSON.stringify(err)}`);
          return message.reply('There was an error during the link checking, I have notified <@251055152667164676> (This bot\'s owner). This should not affect your command.');
        }
        if (data !== null) {
          message.delete();
          prolog.info(`User ${message.author.id} (${message.author.username}#${message.author.discriminator}) posted a link containing ${data} in Guild ${message.guild.id} (${message.guild.name})`);
          return message.channel.send(`The link in <@${message.author.id}>'s message goes to a website containing \`${data}\`. The message has been deleted and the offence has been logged!`);
        }
      });
    });
  }
  if (message.author.bot) return;
  if (!message.content.startsWith(config.Bot.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.Bot.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  if (perms === 'fail') return;
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    return message.reply(':frowning: I don\'t recognize that command. Do ;help to see all of my commands. If you belive this is in error then dm <@251055152667164676>');
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.reply('You do not have permission to do this!');
    try {
      prolog.verbose(`User ${message.author.id} (${message.author.username}#${message.author.discriminator}) is running '${message.content}' in Guild ${message.guild.id} (${message.guild.name})`);
      cmd.run(client, message, params, perms);
    } catch (err) {
      prolog.warn(`There was an error while User ${message.author.id} (${message.author.username}#${message.author.discriminator}) was running '${message.content}' in Guild ${message.guild.id} (${message.guild.name})`);
      return message.reply('Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Command Runner: ' + err + '```');
    }
  }

};