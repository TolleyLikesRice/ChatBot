const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('../settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const appjs = require('../app.js')
const logger = require('../loginit.js')
const winston = require('winston')
const prolog = winston.loggers.get('prolog');

describe('Bot Startup', function () {
  it('Initalize', function () {
    appjs.inittest()
  });

  it('Init Commands', function () {
    appjs.cmdtest()
  });

  it('Elevate Roles', function () {
    appjs.eletest()
    process.exit
  });

});