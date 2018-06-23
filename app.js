const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

//Get Logger
require('./start_scripts/');
const winston = require('winston');
const prolog = winston.loggers.get('prolog');

const config = require('./defs').config;
require('./util/eventLoader')(client);

function init() {
  prolog.verbose('Compiling defs.js');
  prolog.info('Connecting...');

}

function cmd() {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  /*
  //Load all modules
  fs.readdir('./commands/', (err, dirs) => {
    if (err) prolog.error(err);
    prolog.verbose(`Loading a total of ${dirs.length} modules.`);
    dirs.forEach(d => {
      fs.readdir(`./commands/${d}/`, (err, files) => {
        if (err) prolog.error(err);
        prolog.verbose(`Loading a total of ${files.length} ${d} commands.`);
        files.forEach(f => {
          let props = require(`./commands/${d}/${f}`);
          prolog.verbose(`Loading ${d} Command: ${props.help.name}. 👌`);
          client.commands.set(props.help.name, props);
          props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        });
      });
    });
  });*/
  //Load main commands
  fs.readdir('./commands/main/', (err, files) => {
    if (err) prolog.error(err);
    prolog.verbose(`Loading a total of ${files.length} main commands.`);
    files.forEach(f => {
      let props = require(`./commands/main/${f}`);
      prolog.verbose(`Loading Main Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  //Load Giphy commands
  if (config.Giphy.enable === true) {
    fs.readdir('./commands/giphy/', (err, files) => {
      if (err) prolog.error(err);
      prolog.verbose(`Loading a total of ${files.length} giphy commands.`);
      files.forEach(f => {
        let props = require(`./commands/giphy/${f}`);
        prolog.verbose(`Loading Giphy Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  }
  //Load moderation commands
  if (config.Moderation.enable) {
    fs.readdir('./commands/moderation/', (err, files) => {
      if (err) prolog.error(err);
      prolog.verbose(`Loading a total of ${files.length} moderation commands.`);
      files.forEach(f => {
        let props = require(`./commands/moderation/${f}`);
        prolog.verbose(`Loading Moderation Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  }
  //Loading fun commands
  if (config.Fun.enable) {
    fs.readdir('./commands/fun/', (err, files) => {
      if (err) prolog.error(err);
      prolog.verbose(`Loading a total of ${files.length} fun commands.`);
      files.forEach(f => {
        let props = require(`./commands/fun/${f}`);
        prolog.verbose(`Loading Fun Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  }
  //Load stats command
  if (config.Stats.enable) {
    fs.readdir('./commands/stats/', (err, files) => {
      if (err) prolog.error(err);
      prolog.verbose(`Loading a total of ${files.length} stats commands.`);
      files.forEach(f => {
        let props = require(`./commands/stats/${f}`);
        prolog.verbose(`Loading stats Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  }


  /*client.reload = command => {
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
  };*/
}

function ele() {
  client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification */
    let permlvl = 1;
    if (message.member.roles.has(config.Roles.modrole)) permlvl = 2;
    if (message.member.roles.has(config.Roles.adminrole)) permlvl = 3;
    if (message.author.id === config.Bot.ownerid) permlvl = 4;
    return permlvl;
  };
}

module.exports = {
  inittest: init,
  cmdtest: cmd,
  eletest: ele,
};

if (!fs.existsSync('./test.txt')) {
  prolog.verbose('No test, starting ChatBot');
  init();
  cmd();
  ele();
  if (config.Bot.token != 'YOUR-BOT-TOKEN-HERE') {
    client.login(config.Bot.token).catch(error => { prolog.error(`Error During Login. ${error}`); process.exit(1); });
  } else {
    prolog.error('No token in config.toml. Aborting...');
  }
}