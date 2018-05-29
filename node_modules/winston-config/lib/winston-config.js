"use strict";

var fs = require('fs')
  , _isEmpty = require('lodash.isempty')
  , winston = require('winston');

var defaultLogger;

function configLogger(winstonConf) {
  var first;
  var defLogger;

  var i = 0;

  for (var loggerName in winstonConf) {
    winston.loggers.add(loggerName, winstonConf[loggerName]);
    if (i === 0) {
      first = winston.loggers.get(loggerName);
    }

    if (winstonConf[loggerName].hasOwnProperty('isDefault') &&
      winstonConf[loggerName].isDefault) {
      defLogger = winston.loggers.get(loggerName);
    }
  }

  defaultLogger = defLogger || first || winston;
}

function getDefaultLogger() {
  return defaultLogger;
}

// initialize Winston logging mechanism from config (JSON) object
// each logger can be accessed via
// winston.loggers.get(NAME) in all modules
// running in this nodejs app
function fromJson(winstonConf, callback) {
  if (_isEmpty(winstonConf)) {
    callback(new Error('Empty winston configuration'), winston);
    return;
  }

  configLogger(winstonConf);

  callback(null, winston);
}

// initialize Winston logging mechanism from file
function fromFile(filename, callback) {
  var configFile = filename || '../config/winston-config.json';

  fs.exists(configFile, function (exists) {
    if (exists) {
      var winstonConf = require(configFile).logging;

      fromJson(winstonConf, callback);
    } else {
      callback(new Error('No config file found (at least provide a config/winston-config.json) with winston configuration'), winston);
    }
  });
}

// initialize Winston logging mechanism from file (Synchronous, no callback)
function fromFileSync(filename) {
  var configFile = filename || '../config/winston-config.json';

  var exists = fs.existsSync(configFile);

  if (exists) {
    var winstonConf = require(configFile).logging;

    if (_isEmpty(winstonConf)) {
      console.log('Empty winston configuration');
    } else {
      configLogger(winstonConf);
    }

  } else {
    console.log('No config file found (at least provide a config/winston-config.json) with winston configuration');
  }

  return winston;
}

module.exports.fromJson = fromJson;
module.exports.fromFile = fromFile;
module.exports.fromFileSync = fromFileSync;

module.exports.getDefaultLogger = getDefaultLogger;

// these are for backward compatibility
module.exports.configWithName = fromJson;
module.exports.configFromFile = fromFile;
