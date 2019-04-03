const winston = require('winston');
const main = winston.loggers.get('main');
exports.run = (client, message, args, guildConf) => {
    const request = require('request');
    const fx = require('money');
    const amount = parseInt(args[0]);
    const fromarg = args[1];
    const toarg = args[2];
    request('https://api.exchangeratesapi.io/latest', { json: true }, (err, res, body) => {
        if (err) return main.error(err);
        if (!('rates' in body)) {
            main.warn(`Currency converter server error, code ${body.status}. ${message.author.id} sent '${message.content}' in Guild ${message.guild.id} (${message.guild.name}) The response body from the API was '${JSON.stringify(body)}'.`);
            client.users.get('251055152667164676').send(`Currency converter server error, code ${body.status}. User <@${message.author.id}> sent \`${message.content}\` in Guild ${message.guild.id} (${message.guild.name}) The response body from the API was \`\`\`${JSON.stringify(body)}\`\`\`.`);
            return message.reply(`Sorry, the API seems to be down at the moment, try again later. I have notified <@251055152667164676> (The owner of this bot) automatically. If the error is still occurring in 48 hours, email tolleybjcoding@gmail.com with the web error code ${body.status}`);
        }
        var rates = body.rates;
        rates[body.base] = 1;
        fx.base = body.base;
        fx.rates = rates;
        try {
            var out = fx(amount).from(fromarg).to(toarg);
            message.reply(`${amount} ${fromarg} is ${out} ${toarg}`);
        } catch (err) {
            main.warn(err);
            return message.reply(`One of your arguments is in valid. Please use this format ${guildConf.prefix}cc <amount> <from> <to>`);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['convert', 'moneyconvert', 'cm'],
    permLevel: 1
};

exports.help = {
    name: 'cc',
    description: 'Converts currencies, updated every 2 hours',
    usage: 'cc <amount> <from> <to>',
};