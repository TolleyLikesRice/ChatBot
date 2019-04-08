// From CustomBot
// Copyright (c) CustomWorld 2019. (Almost) all rights reserved.

exports.run = (client, message, args) => {
    let remind = args.slice(2).join(' ');
    if (!remind) remind = 'This is the reminder you asked me to send';
    if (isNaN(args[0]) == 'false') return message.channel.send(`"${args[0]}" is not a number.`);
    switch (args[1]) {
        case 'seconds':
            var msDelay = args[0] * 1000;
            message.reply('Your reminder has been set. I will remind you in ' + args[0] + ' second(s).');
            setTimeout(() => { message.author.send('\n**REMINDER:**\n' + remind); }, msDelay);
            break;
        case 'minutes':
            msDelay = args[0] * 60000;
            message.reply('Your reminder has been set. I will remind you in ' + args[0] + ' minute(s).');
            setTimeout(() => { message.author.send('\n**REMINDER:**\n' + remind); }, msDelay); setTimeout(() => { message.author.send('\n**REMINDER:**\n' + remind); }, msDelay);
            break;
        case 'hours':
            msDelay = args[0] * 3600000;
            message.reply('Your reminder has been set. I will remind you in ' + args[0] + ' hour(s).');
            setTimeout(() => { message.author.send('\n**REMINDER:**\n' + remind); }, msDelay);
            break;
        case 'days':
            msDelay = args[0] * 86400000;
            message.reply('Your reminder has been set. I will remind you in ' + args[0] + ' day(s).');
            setTimeout(() => { message.author.send('\n**REMINDER:**\n' + remind); }, msDelay);
            break;
        default:
            message.reply('Invalid arguments. Usage: `remindme <number> <unit: seconds/minutes/hours/days> [message]`');
            break;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['remind', 'reminder', 'setremind', 'setreminder'],
    permLevel: 1
};

exports.help = {
    name: 'remindme',
    description: 'DM\'s a reminder to you after a specified time (Made by CustomWorld)',
    usage: 'remindme <number> <unit: seconds/minutes/hours/days> [message]',
};
