const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const winston = require('winston');
const prolog = winston.loggers.get('prolog');
require('./loginit.js')

require('./util/eventLoader')(client);

function inittest() {
  prolog.info('Connecting...')

}

function cmdtest() {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir('./commands/', (err, files) => {
    if (err) prolog.error(err);
    prolog.verbose(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
      let props = require(`./commands/${f}`);
      prolog.verbose(`Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });

  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
}

function eletest() {
  client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification */
    let permlvl = 0;
    let mod_role = message.guild.roles.find('name', settings.modrolename);
    if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
    let admin_role = message.guild.roles.find('name', settings.adminrolename);
    if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
    if (message.author.id === settings.ownerid) permlvl = 4;
    return permlvl;
  };
}

module.exports = {
  inittest: inittest,
  cmdtest: cmdtest,
  eletest: eletest,
};

inittest()
cmdtest()
eletest()
if (settings.token != "YOUR-BOT-TOKEN-HERE") {
  client.login(settings.token);
} else {
  prolog.error('No token in settings.json. Aborting...')
}