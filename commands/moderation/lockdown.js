const ms = require('ms');
const winston = require('winston');
const main = winston.loggers.get('main');
const config = require('../../mainDefs').config;
exports.run = (client, message, args) => {
    if (!client.lockit) client.lockit = [];
    const time = args.join(' ');
    const validUnlocks = ['release', 'unlock'];
    if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('Lockdown lifted.');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            main.error(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send('Lockdown lifted.')).catch(main.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                main.error(error);
            });
        });
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ld'],
    permLevel: config.Moderation.lockdownlevel
};

exports.help = {
    name: 'lockdown',
    description: 'This will lock a channel down for the set duration, be it in hours, minutes or seconds.',
    usage: 'lockdown <duration>'
};