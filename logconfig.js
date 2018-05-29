const settings = require('./settings.json')
const path = require('path')
const winstonConf = require('winston-config');

if (settings.debuglogging = false) {
    winstonConf.fromFile(path.join(__dirname, 'logconfigs/reg.json'));
} else {
    winstonConf.fromFile(path.join(__dirname, 'logconfigs/debug.json'));
}