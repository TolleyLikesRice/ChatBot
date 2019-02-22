// cSpell:ignore Enmap, main
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
const config = require('./mainDefs').config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Create array of globally enabled modules
client.enabledModules = ['main'];
/* istanbul ignore next */
if (config.Fun.enable) client.enabledModules.push('fun');
/* istanbul ignore next */
if (config.Giphy.enable) client.enabledModules.push('giphy');
/* istanbul ignore next */
if (config.Moderation.enable) client.enabledModules.push('moderation');
/* istanbul ignore next */
if (config.Stats.enable) client.enabledModules.push('stats');

//Set up enmap
client.settings = new Enmap({ provider: new Provider({ name: 'settings' }) });
client.defaultSettings = {
  modRole: 'Moderator',
  adminRole: 'Admin',
  serverOwnerID: undefined,
  enabledModules: client.enabledModules
};

//Get Logger
require('./start_scripts');
const winston = require('winston');
const main = winston.loggers.get('main');

require('./util/eventLoader')(client);

//Print out lettering
main.verbose('  _                     _ _             ');
main.verbose(' | |                   | (_)            ');
main.verbose(' | |     ___   __ _  __| |_ _ __   __ _ ');
main.verbose(' | |    / _ \\ / _` |/ _` | | \'_ \\ / _` |');
main.verbose(' | |___| (_) | (_| | (_| | | | | | (_| |');
main.verbose(' |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |');
main.verbose('                                   __/ |');
main.verbose('                                  |___/');
main.verbose('------------------------------------------------');

function init() {
  main.info('Connecting...');
}

function loadModule(ModuleFolder) {

  let files;
  try {
    files = fs.readdirSync(`./commands/${ModuleFolder}/`);
  } catch (error) {
    throw new Error('Module Load Error');
  }
  main.verbose(`Loading a total of ${files.length} ${ModuleFolder} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${ModuleFolder}/${f}`);
    main.verbose(`Loading ${ModuleFolder} Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
  main.verbose('------------------------------------------------');
}
/*function cmd() {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  //Load main commands
  fs.readdir('./commands/main/', (err, files) => {
    if (err) main.error(err);
    main.verbose(`Loading a total of ${files.length} main commands.`);
    files.forEach(f => {
      let props = require(`./commands/main/${f}`);
      main.verbose(`Loading Main Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  //Load Giphy commands
  if (config.Giphy.enable === true) {
    fs.readdir('./commands/giphy/', (err, files) => {
      if (err) main.error(err);
      main.verbose(`Loading a total of ${files.length} giphy commands.`);
      files.forEach(f => {
        let props = require(`./commands/giphy/${f}`);
        main.verbose(`Loading Giphy Command: ${props.help.name}. 👌`);
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
      if (err) main.error(err);
      main.verbose(`Loading a total of ${files.length} moderation commands.`);
      files.forEach(f => {
        let props = require(`./commands/moderation/${f}`);
        main.verbose(`Loading Moderation Command: ${props.help.name}. 👌`);
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
      if (err) main.error(err);
      main.verbose(`Loading a total of ${files.length} fun commands.`);
      files.forEach(f => {
        let props = require(`./commands/fun/${f}`);
        main.verbose(`Loading Fun Command: ${props.help.name}. 👌`);
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
      if (err) main.error(err);
      main.verbose(`Loading a total of ${files.length} stats commands.`);
      files.forEach(f => {
        let props = require(`./commands/stats/${f}`);
        main.verbose(`Loading stats Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  } 


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
}*/

function ele() {
  /* istanbul ignore next */
  client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification */
    try {
      const admin = message.guild.roles.find('name', client.settings.get(message.member.guild.id, 'adminRole')).id;
      const mod = message.guild.roles.find('name', client.settings.get(message.member.guild.id, 'modRole')).id;
      let permlvl = 1;
      if (message.member.roles.has(mod)) permlvl = 2;
      if (message.member.roles.has(admin)) permlvl = 3;
      if (message.author.id === config.Bot.ownerid) permlvl = 4;
      return permlvl;
    } catch(err) {
      message.reply('Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Elevation System: ' + err + '```');
      return 'fail';
    }
  };
}

module.exports = {
  inittest: init,
  loadModule: loadModule,
  eletest: ele,
};


main.debug('No test, starting ChatBot');
init();
main.verbose('------------------------------------------------');
//Load in alphabetical order
/* istanbul ignore next */
if (config.Fun.enable) loadModule('fun');
/* istanbul ignore next */
if (config.Giphy.enable) loadModule('giphy');
loadModule('main');
/* istanbul ignore next */
if (config.Moderation.enable) loadModule('moderation');
/* istanbul ignore next */
if (config.Stats.enable) loadModule('stats');
if (config.Utilities.enable) loadModule('utilities');
ele();
/* istanbul ignore next */
if (!fs.existsSync('./test.txt')) {
  if (config.Bot.token != 'YOUR-BOT-TOKEN-HERE') {
    client.login(config.Bot.token).catch(error => { main.error(`Error During Login. ${error}`); process.exit(1); });
  } else {
    main.error('No token in config.toml. Aborting...');
  }
}