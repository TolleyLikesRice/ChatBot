const reqEvent = (event) => require('../events/' + event);
module.exports = (client, dbl) => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('reconnecting', () => reqEvent('reconnecting')(client));
    client.on('disconnect', reqEvent('disconnect'));
    client.on('message', reqEvent('message'));
    client.on('guildBanAdd', reqEvent('guildBanAdd'));
    client.on('guildBanRemove', reqEvent('guildBanRemove'));
    client.on('guildCreate', reqEvent('guildCreate'));
    client.on('guildDelete', reqEvent('guildDelete'));
    client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
    if (dbl !== undefined) {dbl.on('posted', reqEvent('dblPosted'));}
};