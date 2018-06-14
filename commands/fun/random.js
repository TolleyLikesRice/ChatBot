const rn = require('random-number');
exports.run = (client, message, args) => {
  let num1 = parseInt(args.join(' '));
  let num2 = args.slice(1).join(' ');
  let num12 = parseInt(num1)
  let num22 = parseInt(num2)
  var options = {
    min:  num12
  , max:  num22
  , integer: true
  }
  var number = rn(options)
  message.reply(`Your number between ${num1} and ${num2} is ${number}`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'random',
  description: 'Generates a random number between number1 and number2',
  usage: 'random <number1> <number2>'
};
