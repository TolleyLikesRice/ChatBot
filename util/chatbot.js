const apiai = require('apiai') //api.ai package is needed
const chat = apiai("your Api.AI token (.env recommended)"); // just insert your DF token there

module.exports = async (client, message) => { // export some stuff
  if (message.author.bot || message.system) return; // botception
  // perhaps this is not what you exactly want:
  //if (message.guild && message.channel.id !== "id to allow chatbot at") return;
  if (message.content.startsWith(config.Bot.prefix)) return; // ignore commands
  const request = chat.textRequest(message.content, { // here we introcude the "request" to the computer
        sessionId: message.author.id
    });

    request.on('error', function(error) {
      console.log(`${message.guild.name} (${message.guild.id}) made an oopsie: ${error}`); // log the error, I don't know what logger do you use
    });

    request.on('response', async function(response) { // here we async initialize the request        
      let reply = response.result.fulfillment.speech; // grab the response from DialogFlow API
      await message.channel.startTyping(); // nice effect to make the bot look like it's "typing"
      await setTimeout(1000); // you can make a randomizer there so it won't look boring. idk if timeout works, perhaps add some package
      await message.channel.send(`${reply}`).catch(console.error); // send the response
      await message.channel.stopTyping();
    });
    
     request.end(); // end the request to make it tidy - we no longer need this
}
