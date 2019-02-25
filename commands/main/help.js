exports.run = (client, message, params, guildConf) => {
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.channel.send(`= Command List =\n\n[Use ${guildConf.prefix}help <commandname> for more details]\n\n${client.commands.map(c => `${guildConf.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
    } else {
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:'asciidoc'});
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 1
};

exports.help = {
    name: 'help',
    description: 'Displays all commands.',
    usage: 'help [command]'
};