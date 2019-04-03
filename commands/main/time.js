exports.run = (client, message) => {
    const d = new Date();
    message.reply(`The current bot time is ${d}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['t'],
    permLevel: 1
};

exports.help = {
    name: 'time',
    description: 'Gives the current bot time',
    usage: 'time',
};