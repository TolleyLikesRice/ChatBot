const config = require('../mainDefs').config;
const checkLink = require('../mainDefs').checkLink;
const getUrls = require('get-urls');
const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = message => {
  let urls = Array.from(getUrls(message.content));
  if (urls !== []) {
    urls.forEach(url => {
      checkLink(url, function (err, data) {
        if (err) throw err;
        if (data !== null) {
          message.delete();
          prolog.info(` User ${message.author.id} (${message.author.username}#${message.author.discriminator}) posted a link containing ${data} in Guild ${message.guild.id} (${message.guild.name})`);
          return message.channel.send(`The link in <@${message.author.id}>'s message goes to a website containing \`${data}\`. The message has been deleted and the offence has been logged!`);
        }
      });
    });
  }
  if (message.author.bot) return;
  let client = message.client;
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
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.reply('You do not have permission to do this!');
    try {
      cmd.run(client, message, params, perms);
    } catch (err) {
      return message.reply('Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Command Runner: ' + err + '```');
    }
  }

};