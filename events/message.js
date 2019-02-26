const config = require('../mainDefs').config;
const checkLink = require('../mainDefs').checkLink;
const getUrls = require('get-urls');
const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = message => {
    const client = message.client;
    if (message.author.bot) return;
    if (!message.guild) return message.reply('Sorry ChatBot does not supports commands from DMs at the moment.');
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    client.settings.set(message.guild.id, message.guild.ownerID, 'serverOwner');
    let urls = Array.from(getUrls(message.content));
    if (urls !== []) {
        urls.forEach(url => {
            checkLink(url, function (err, data) {
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
    let prefix = guildConf.prefix || config.prefix;
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
    } else {
        return message.reply(':frowning: I don\'t recognize that command. Do ' + prefix + 'help to see all of my commands. If you belive this is in error then dm <@251055152667164676>');
    }
    let perms = client.elevation(message, cmd.conf.permLevel);
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