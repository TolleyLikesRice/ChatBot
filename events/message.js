const config = require('../defs').config;
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.Bot.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.Bot.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.reply('You do not have permisson to do this!');
    cmd.run(client, message, params, perms);
  }

};