// cSpell:ignore Enmap, main
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const DiscordBotsList = require('dblapi.js');
const config = require('./mainDefs').config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
let dbl;
if (config.dblEnable === true) { dbl = new DiscordBotsList(config.dblAPI, client); }

//Set up enmap
client.settings = new Enmap({
    name: 'settings',
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});
client.defaultSettings = {
    prefix: config.Bot.prefix,
    modLogChannel: 'mod-log',
    modRole: 'Moderator',
    adminRole: 'Administrator',
    serverOwner: 0,
    welcomeChannel: 'general',
    welcomeMessage: 'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
    msgOffTimerEnable: 'false',
    msgOffTimerStart: '00:00',
    msgOffTimerEnd: '00:00'
};

//Get Logger
require('./start_scripts');
const winston = require('winston');
const main = winston.loggers.get('main');
require('./util/eventLoader')(client, dbl);

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
        const props = require(`./commands/${ModuleFolder}/${f}`);
        main.verbose(`Loading ${ModuleFolder} Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
    main.verbose('------------------------------------------------');
}

function ele() {
    /* istanbul ignore next */
    client.elevation = (message, lvl) => {
        try {
            const mod = message.guild.roles.find(role => role.name === client.settings.get(message.member.guild.id, 'modRole'));
            const admin = message.guild.roles.find(role => role.name === client.settings.get(message.member.guild.id, 'adminRole'));
            let permlvl = 1;
            if (message.author.id === config.Bot.ownerid) return 4;
            if (message.member.id == client.settings.get(message.member.guild.id, 'serverOwner')) return 4;
            if (lvl > 1 && permlvl === 1) {
                if (mod == undefined) {
                    message.reply(`Sorry! We could not find the moderator role on your server, please ask one of your server admins to fix this by creating a role called ${client.settings.get(message.member.guild.id, 'modRole')} and then set the name of the Admin role you normally use with the setconf command`);
                    return 'fail';
                }
                if (admin == undefined) {
                    message.reply(`Sorry! We could not find the administrator role on your server, please ask one of your server admins to fix this by creating a role called ${client.settings.get(message.member.guild.id, 'adminRole')} and then set the name of the Admin role you normally use with the setconf command`);
                    return 'fail';
                }
                if (message.member.roles.has(mod.id)) permlvl = 2;
                if (message.member.roles.has(admin.id)) permlvl = 3;
            }
            return permlvl;
        } catch (err) {
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
//Load in alphabetical order (cause OCD and neatness)
/* istanbul ignore next */
if (config.Fun.enable) loadModule('fun');
/* istanbul ignore next */
if (config.Giphy.enable) loadModule('giphy');
loadModule('main');
/* istanbul ignore next */
if (config.Moderation.enable) loadModule('moderation');
loadModule('serverConfig');
/* istanbul ignore next */
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