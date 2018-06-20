const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
function loadmodule(folder) {
    fs.readdir(`./commands/${folder}/`, (err, files) => {
        if (err) console.error(err);
        console.log(`Loading a total of ${files.length} ${folder} commands.`);
        files.forEach(f => {
          let props = require(`../commands/${folder}/${f}`);
          console.log(`Loading ${folder} Command: ${props.help.name}. 👌`);
          client.commands.set(props.help.name, props);
          props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        });
      });
}

describe('Load Commands', function () {
    it('Main Module', function () {
        loadmodule('main')
    });

    it('Fun Module', function () {
        loadmodule('fun')
    });

    it('Giphy Module', function () {
        loadmodule('giphy')
    });
    it('Moderation Module', function () {
        loadmodule('moderation')
    });
    it('Stats Module', function () {
        loadmodule('stats')
    });
});