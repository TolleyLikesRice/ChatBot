const config = require('../mainDefs').config;
const checkLink = require('../mainDefs').checkLink;
const getUrls = require('get-urls');
const chatHandler = require('../util/chatHandler');
const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = message => {
    const client = message.client;
    if (message.author.bot) return;
    if (!message.guild) return message.reply('Sorry ChatBot does not supports commands from DMs at the moment.');
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    //client.settings.set(message.guild.id, message.guild.ownerID, 'serverOwner');
    function find_diff(arr1, arr2) {
        const diff = [];
        const joined = arr1.concat(arr2);
        let i;
        for (i = 0; i <= joined.length; i++) {
            const current = joined[i];
            if (joined.indexOf(current) == joined.lastIndexOf(current)) {
                diff.push(current);
            }
        }
        diff.splice(diff.length - 1, 1);
        return diff;
    }
    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }
    const diff = find_diff(Object.keys(guildConf), Object.keys(client.defaultSettings));
    let i;
    for (i = 0; i < diff.length; i++) {
        client.settings.set(message.guild.id, client.defaultSettings[diff[i]], diff[i]);
    }
    clean(guildConf);
    const urls = Array.from(getUrls(message.content));
    if (urls !== []) {
        urls.forEach(url => {
            checkLink(url, (err, data) => {
                if (err !== null) {
                    client.users.get('251055152667164676').send(`There was an error while User <@${message.author.id}> (${message.author.username}#${message.author.discriminator}) message was being scanned in Guild <@${message.guild.id}> (${message.guild.name}) It was a \`${err.code}\` error with the message \`${err.message}\`.\nThe body is:\n\`\`\`${JSON.stringify(err)}\`\`\``);
                    main.warn(`There was an error while User ${message.author.id} (${message.author.username}#${message.author.discriminator}) message was being scanned in Guild ${message.guild.id} (${message.guild.name}) It was a ${err.code} error with the message ${err.message}.\nThe body is:\n${JSON.stringify(err)}`);
                    return message.reply('There was an error during the link checking, I have notified <@251055152667164676> (This bot\'s owner). This should not affect your command.');
                }
                if (data !== null) {
                    message.delete();
                    main.info(`User ${message.author.id} (${message.author.username}#${message.author.discriminator}) posted a link containing ${data} in Guild ${message.guild.id} (${message.guild.name})`);
                    return message.channel.send(`The link in <@${message.author.id}>'s message goes to a website containing \`${data}\`. The message has been deleted and the offence has been logged!`);
                }
            });
        });
    }
    var d = new Date(); // current time
    var hours = d.getHours();
    var mins = d.getMinutes();
    if (hours.length == 1) { hours = parseInt(`0${hours}`); }
    if (mins.length == 1) { hours = parseInt(`0${mins}`); }
    var time = `${hours}:${mins}`;
    var start = guildConf.msgOffTimerStart;
    var end = guildConf.msgOffTimerEnd;
    if (guildConf.msgOffTimerEnable == 'true' && Date.parse(`01/01/2011 ${time}`) >= Date.parse(`01/01/2011 ${start}`) && Date.parse(`01/01/2011 ${time}`) < Date.parse(`01/01/2011 ${end}`)) {
        return;
    }

    if (message.content.startsWith(`<@${client.user.id}>`)) {
        chatHandler.run(client, message);
        return;
    }
    const prefix = guildConf.prefix || config.Bot.prefix;
    //if (!message.content.startsWith(guildConf.prefix)) return;
    if (!message.content.startsWith(prefix)) return;
    //let command = message.content.split(' ')[0].slice(guildConf.prefix.length);
    //let args = message.content.split(' ').slice(guildConf.prefix.length);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    } else if (cmd.conf.enabled === false) {
        return message.reply(':frowning: Sorry, that command is disabled.');
    } else {
        return message.reply(':frowning: I don\'t recognize that command. Do `' + prefix + 'help` to see all of my commands. If you believe this is in error then dm <@251055152667164676>');
    }
    const perms = client.elevation(message, cmd.conf.permLevel);
    if (perms === 'fail') return;
    if (perms < cmd.conf.permLevel) return message.reply(`You do not have permission to do this! You need Permlevel ${cmd.conf.permLevel} but you only have Permlevel ${perms}`);
    try {
        main.verbose(`User ${message.author.id} (${message.author.username}#${message.author.discriminator}) is running '${message.content}' in Guild ${message.guild.id} (${message.guild.name})`);
        cmd.run(client, message, args, guildConf, perms);
    } catch (err) {
        main.warn(`There was an error while User ${message.author.id} (${message.author.username}#${message.author.discriminator}) was running '${message.content}' in Guild ${message.guild.id} (${message.guild.name}) The content was\n${err}`);
        return message.reply('Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Command Runner: ' + err + '```');
    }

};