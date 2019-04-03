const giphy = require('../../mainDefs.js').giphy;
const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const st = args.join(' ');
    const res = args.slice(1).join(' ');
    if (st.length < 1) return message.reply('You must supply a search term');
    if (res.length < 1) {
        giphy.search('gifs', { 'q': st, 'limit': 1, 'rating': 'pg' })
            .then((response) => {
                response.data.forEach((gifObject) => {
                    var embed = new Discord.RichEmbed()
                        .setColor('#0050ff')
                        .setTitle(`${message.author.username}'s Gif`)
                        .setImage(gifObject.images.original.gif_url);
                    message.channel.send({ embed });
                });
                message.channel.send({
                    files: [{
                        attachment: 'Assets/Giphy/giphyfooter.gif',
                        name: 'Assets/Giphy/giphyfooter.gif'
                    }]
                });
            })
            .catch((err) => {
                message.reply(err);
            });
    } else if (parseInt(res) > 25) {
        return message.reply('Too many results. MAX: 25');
    } else if (parseInt(res) > 0) {
        let num = 0;
        giphy.search('gifs', { 'q': st, 'limit': parseInt(res), 'rating': 'pg' })
            .then((response) => {
                response.data.forEach((gifObject) => {
                    num = num + 1;
                    var embed = new Discord.RichEmbed()
                        .setColor('#0050ff')
                        .setTitle(`${message.author.username}'s Gif result ${num}`)
                        .setImage(gifObject.images.original.gif_url);
                    message.channel.send({ embed });
                });
                message.channel.send({
                    files: [{
                        attachment: 'Assets/Giphy/giphyfooter.gif',
                        name: 'Assets/Giphy/giphyfooter.gif'
                    }]
                })
                    .catch(console.error);
            })
            .catch((err) => {
                message.reply(err);
            });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'gifsearch',
    description: 'Search for gifs on giphy',
    usage: 'gifsearch <search> [Results]'
};