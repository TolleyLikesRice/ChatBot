const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = (guild, user) => {

    main.verbose(`New Unban: Target:${user.tag} Moderator:${guild.client.unbanAuth.tag} Reason:${guild.client.unbanReason}`);
};