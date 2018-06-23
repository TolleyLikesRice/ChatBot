const winston = require('winston')
const prolog = winston.loggers.get('prolog')
const config = require('../../defs').config
exports.run = (client, message) => {
  if (config.Stats.enablestats === true) {
    //Set Total User Count
    var guildmembers = message.guild.memberCount
    var channel = client.channels.get(config.Stats.tusersid)
    var bots = 0
    channel.edit({ name: `${config.Stats.tuserstext} ${guildmembers}` })
      .then(prolog.verbose)
      .catch(prolog.error);
    message.reply(`Set to: ${config.Stats.tuserstext}: ${guildmembers}`)
    prolog.info(`Set ${config.Stats.tuserstext} to ${guildmembers}. For more info see verbose`)
    //Set number of bots
    var Count;
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      var id = User.id
      if (id != 1) {
        if (User.bot === true) {
          bots = bots + 1;
        }
      }
    }
    channel = client.channels.get(config.Stats.botsid);
    channel.edit({ name: `${config.Stats.botstext} ${bots}` })
      .then(prolog.verbose)
      .catch(prolog.error);
    message.reply(`Set to: ${config.Stats.botstext} ${bots}`)
    prolog.info(`Set ${config.Stats.botstext} to ${bots}. For more info see verbose`)
    //Set Number of members
    var members = guildmembers - bots
    channel = client.channels.get(config.Stats.memberid)
    channel.edit({name: `${config.Stats.membertext} ${members}`})
      .then(prolog.verbose)
      .catch(prolog.error)
    message.reply(`Set to: ${config.Stats.membertext} ${members}`)
    prolog.info(`Set ${config.Stats.membertext} to ${members}. For more info see verbose`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: config.Stats.updatepermlevel
};

exports.help = {
  name: 'updatestats',
  description: 'Updates server stats. (If enabled)',
  usage: 'updatestats'
};