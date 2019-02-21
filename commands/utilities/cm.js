const winston = require('winston');
const prolog = winston.loggers.get('prolog');
exports.run = (client, message, args) => {
  const request = require('request');
  const fx = require('money');
  const amount = parseInt(args.join(' '));
  const fromarg = args.slice(1).join(' ').split(' ')[0];
  const toarg = args.slice(1).join(' ').split(' ')[1];
  request('https://www.mycurrency.net/service/rates', { json: true }, (err, res, body) => {
    if (err) return prolog.error(err);
    if (body.status !== 200) {
      prolog.warn(`Currency converter server error, code ${body.status}. User <@${message.author.id}> sent \`${message.content}\` in Guild ${message.guild.id} (${message.guild.name}) The response body from the API was \`\`\`${JSON.stringify(body)}\`\`\`.`);
      client.users.get('251055152667164676').send(`Currency converter server error, code ${body.status}. User <@${message.author.id}> sent \`${message.content}\` in Guild ${message.guild.id} (${message.guild.name}) The response body from the API was \`\`\`${JSON.stringify(body)}\`\`\`.`);
      return message.reply(`Sorry, the API seems to be down at the moment, try again later. I have notified <@251055152667164676> (The owner of this bot) automatically. If the error is still occurring in 48 hours, email tolleybjcoding@gmail.com with the web error code ${body.status}`);
    }
    var codes = body.map(value => value.currency_code);
    var rates = body.map(value => value.rate);
    var fxIn = {};
    codes.forEach((key, i) => fxIn[key] = rates[i]);
    fx.base = 'USD';
    fx.rates = fxIn;
    let out;
    try {
      out = fx.convert(amount, { from: fromarg, to: toarg });
    } catch (err) {
      return message.reply('One of your aruments is in valid. Please use this format cm <amount> <from> <to>');
    }
    message.reply(`${amount} ${fromarg} is ${out} ${toarg}`);
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
  description: 'Converts currencys, updated every 2 hours',
  usage: 'cc <amount> <from> <to>',
};