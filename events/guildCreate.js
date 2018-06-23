const winston = require('winston');
const prolog = winston.loggers.get('prolog');
const Datastore = require('nedb');
module.exports = guild => {
  prolog.info(`I just joined a discord server called: ${guild.name}`);
  prolog.verbose(`Creating new database file for guild ${guild.id}`);
  const db = new Datastore({ filename: `databases/${guild.id}.db`, autoload: true });
  var guildOwner = guild.owner;
  var guildOwnerID = guild.ownerID;
  db.insert({
    'type': 'user',
    'name': guildOwner.user.username,
    'id': guildOwnerID,
    'role': 'Owner',
    'permlevel': 4
  });
};