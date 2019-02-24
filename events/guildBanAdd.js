const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = (guild, user) => {
    main.verbose(`${user.tag} (${user.id})was just banned!`);
};