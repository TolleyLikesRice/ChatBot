const settings = require('./settings.json')
const path = require('path')
const winstonConf = require('winston-config');

if (settings.debuglogging = false) {
    winstonConf.fromFile(path.join(__dirname, 'logconfigs/reg.json'), callback(error, winston), {
        if(error) {
            console.log('error during winston configuration');
        }
    });
} else {
    winstonConf.fromFile(path.join(__dirname, 'logconfigs/debug.json'), callback(error, winston), {
        if(error) {
            console.log('error during winston configuration');
        }
    });
}