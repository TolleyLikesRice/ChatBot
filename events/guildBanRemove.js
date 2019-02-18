const winston = require('winston');
const prolog = winston.loggers.get('prolog');
module.exports = (guild, user) => {

  prolog.verbose(`New Unban: Target:${user.tag} Moderator:${guild.client.unbanAuth.tag} Reason:${guild.client.unbanReason}`);
};