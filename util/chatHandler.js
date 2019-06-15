const apiai = require('apiai');
const chat = apiai('e31ba42e7b5f43f093842cd860f62f56');
const rn = require('random-number');

var numOptions = {
    min: 200
    , max: 1000
    , integer: true
};
exports.run = async (client, message) => {

    const request = chat.textRequest(message.content, { // here we introduce the "request" to the computer
        sessionId: message.author.id
    });

    request.on('error', (error) => {
        console.log(`${message.guild.name} (${message.guild.id}) made an oopsie: ${error}`); // log the error, I don't know what logger do you use
    });

    request.on('response', async (response) => { // here we async initialize the request        
        const reply = response.result.fulfillment.speech; // grab the response from DialogFlow API
        await message.channel.startTyping(); // nice effect to make the bot look like it's "typing"
        await setTimeout(() => {
            message.channel.send(`${reply}`).catch(console.error); // send the response
            message.channel.stopTyping();
        }, rn(numOptions));
    });

    request.end(); // end the request to make it tidy - we no longer need this
};