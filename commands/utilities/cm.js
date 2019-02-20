exports.run = (client, message, args) => {
  const request = require('request');
  const fx = require('money');
  const amount = parseInt(args.join(' '));
  const fromarg = args.slice(1).join(' ').split(' ')[0];
  const toarg = args.slice(1).join(' ').split(' ')[1];
  request('https://www.mycurrency.net/service/rates', { json: true }, (err, res, body) => {
    if (err) return console.log(err);
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
  aliases: ['convert', 'moneyconvert', 'cc'],
  permLevel: 1
};

exports.help = {
  name: 'cm',
  description: 'Converts currencys, updated every 2 hours',
  usage: 'cc <amount> <from> <to>',
};