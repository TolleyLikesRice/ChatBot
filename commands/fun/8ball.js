exports.run = (client, message) => {
    var responces = ['It is certain', 'Its is decidedly so', 'Without a doubt', 'Yes definatly', 'You may rely on it', 'You can count on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Absolutley', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful', 'Chances aren\'t good'];
    var show = responces[Math.floor(Math.random() * responces.length)];
    message.reply(show);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: '8ball',
    description: 'Ask the magic 8 ball',
    usage: '8ball <question>'
};