exports.run = (client, message) => {
    const funcs = require('../../mainDefs');
    var responces = funcs.textToArray('config/facts.txt');
    var show = responces[Math.floor(Math.random() * responces.length)];
    message.reply(`Did you Know? ${show}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'randomfact',
    description: 'Gives you a random fact',
    usage: 'randomfact'
};