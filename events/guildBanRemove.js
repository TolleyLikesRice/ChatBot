
const Discord = require('discord.js');

module.exports = (guild, user) => {

  console.log(`New Unban: Target:${user.tag} Moderator:${guild.client.unbanAuth.tag} Reason:${guild.client.unbanReason}`);
};