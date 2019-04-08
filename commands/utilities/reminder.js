// From CustomBot
// Copyright (c) CustomWorld 2019. (Almost) all rights reserved.

exports.run = async (client, message, args) => {
  message.delete();
  let remind = args.slice(2).join(" ");
  if (!remind) remind = "Get ur crap together."
  if (isNaN(args[0]) == "false") return message.channel.send(`"${args[0]}" is not a number.`);
    switch(args[1]) {
      case 'seconds': 
        var msDelay = args[0] * 1000;
        message.channel.send("Your reminder has been set. I will remind you in " + args[0] + " second(s).");
        await client.wait(msDelay);
        message.author.send("\n**REMINDER:**\n" + remind);
        break;      
      case 'minutes': 
        var msDelay = args[0] * 60000;
        message.channel.send("Your reminder has been set. I will remind you in " + args[0] + " minute(s).");
        await client.wait(msDelay);
        message.author.send("\n**REMINDER:**\n" + remind);
        break;      
      case 'hours': 
        var msDelay = args[0] * 3600000;
        message.channel.send("Your reminder has been set. I will remind you in " + args[0] + " hour(s).");
        await client.wait(msDelay);
        message.author.send("\n**REMINDER:**\n" + remind);
        break;
      case 'days': 
        var msDelay = args[0] * 86400000;
        message.channel.send("Your reminder has been set. I will remind you in " + args[0] + " day(s).");
        await client.wait(msDelay);
        message.author.send("\n**REMINDER:**\n" + remind);
        break;
      default:
        await message.reply("Invalid arguments. Usage: `remindme <number> <unit: seconds/minutes/hours/days> <message>`");
        break;
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["remind", "reminder", "setremind", "setreminder"],
  permLevel: 1
};

exports.help = {
  name: "remindme",
};
