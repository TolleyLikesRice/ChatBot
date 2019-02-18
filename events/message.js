const config = require('../mainDefs').config;
const checkLink = require('../mainDefs').checkLink;
const getUrls = require('get-urls');
module.exports = message => {
  let urls = Array.from(getUrls(message.content));
  if (urls !== []) {
    urls.forEach(url => {
      checkLink(url, function (err, data) {
        if (err) throw err;
        if (data !== null) {
          message.delete();
          return message.channel.send(`${message.author.username}#${message.author.discriminator}'s message contained a link to an unsafe site and has been deleted. This offence has been logged`);
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
      return message.reply('Sorry an error has occurred please DM Tolley#3216 with the error message below\n```Command Runner: ' + err + '```');
    }
  }

};