/*global describe, it */
"use strict";

var path = require('path')
  , assert = require('assert')
  , should = require('should');

describe('winston-config', function () {

  it('should read config from given file', function () {

    require('../lib/winston-config').fromFile(path.join(__dirname, '../config/example-winston-config.json'), function (error, winston) {
      should.exist(winston.loggers.get('application'));

      winston.loggers.get('application').transports['console'].level.should.equal('info');
      winston.loggers.get('application').transports['console'].colorize.should.be.ok;

      winston.loggers.get('application').transports['file'].level.should.equal('info');
      winston.loggers.get('application').transports['file'].colorize.should.be.not.ok;
      winston.loggers.get('application').transports['file'].filename.should.equal('app.log');

      should.exist(winston.loggers.get('http'));

      winston.loggers.get('http').transports['console'].level.should.equal('warn');
      winston.loggers.get('http').transports['console'].colorize.should.be.ok;

      winston.loggers.get('http').transports['file'].level.should.equal('info');
      winston.loggers.get('http').transports['file'].colorize.should.be.not.ok;
      winston.loggers.get('http').transports['file'].filename.should.equal('http.log');

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

  it('should inject given config into winston', function () {

    var logging = {
      "application": {
        "console": {
          "level": "warn",
          "colorize": false
        },
        "file": {
          "timestamp": true,
          "json": false,
          "filename": "logs/app.log",
          "maxfiles": 5,
          "maxsize": 10485760,
          "level": "error"
        }
      },
      "http": {
        "console": {
          "level": "warn",
          "colorize": true
        },
        "file": {
          "timestamp": true,
          "json": false,
          "filename": "logs/http.log",
          "maxfiles": 5,
          "maxsize": 10485760,
          "level": "info"
        }
      }
    };

    require('../lib/winston-config').fromJson(logging, function (error, winston) {
      assert(!error);
      should.exist(winston.loggers.get('application'));

      winston.loggers.get('application').transports['console'].level.should.equal('warn');
      winston.loggers.get('application').transports['console'].colorize.should.not.be.ok;

      winston.loggers.get('application').transports['file'].level.should.equal('error');
      winston.loggers.get('application').transports['file'].colorize.should.be.not.ok;
      winston.loggers.get('application').transports['file'].filename.should.equal('app.log');

      should.exist(winston.loggers.get('http'));

      winston.loggers.get('http').transports['console'].level.should.equal('warn');
      winston.loggers.get('http').transports['console'].colorize.should.be.ok;

      winston.loggers.get('http').transports['file'].level.should.equal('info');
      winston.loggers.get('http').transports['file'].colorize.should.be.not.ok;
      winston.loggers.get('http').transports['file'].filename.should.equal('http.log');

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

  it('should work for every transport in given config (e.g. winston-email and winston-mongodb)', function () {

    require('winston-email');
    // this is the correct initialization for this logger, please not the correct usage of
    // "mongoDB" in the transports (JSON file) as well
    require('winston-mongodb').MongoDB;

    var logging = {
      "application": {
        "email": {
          "to": "test@testmail.com",
          "from": "test@error.com",
          "auth": { user: "test", pass: "test" },
          "level": "error"
        }
      },
      "dblog": {
        "mongoDB": {
          "level": "warn",
          "silent": "true",
          "collection": "log",
          "db": "mongodb://localhost/winston_dummydb"
        }
      }
    };

    require('../lib/winston-config').fromJson(logging, function (error, winston) {
      assert(!error);
      should.exist(winston.loggers.get('application'));

      winston.loggers.get('application').transports['email'].level.should.equal('error');

      should.exist(winston.loggers.get('dblog'));
      // note the all lower case logger name
      winston.loggers.get('dblog').transports['mongodb'].level.should.equal('warn');

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

  it('should return error and initial winston if empty json object is injected', function () {
    var logging;

    assert(!logging);

    require('../lib/winston-config').fromJson(logging, function (error, winston) {
      assert(error);
      should.exist(winston.loggers.get('application'));

      winston.loggers.get('application').transports['console'].level.should.equal('silly');
      winston.loggers.get('application').transports['console'].colorize.should.not.be.ok;

      assert(!winston.loggers.get('application').transports['file']);

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

  it('should read config from given file (synchronous)', function () {

    var winston = require('../lib/winston-config').fromFileSync(path.join(__dirname, '../config/example-winston-config.json'));

    should.exist(winston.loggers.get('application'));

    winston.loggers.get('application').transports['console'].level.should.equal('info');
    winston.loggers.get('application').transports['console'].colorize.should.be.ok;

    winston.loggers.get('application').transports['file'].level.should.equal('info');
    winston.loggers.get('application').transports['file'].colorize.should.be.not.ok;
    winston.loggers.get('application').transports['file'].filename.should.equal('app.log');

    should.exist(winston.loggers.get('http'));

    winston.loggers.get('http').transports['console'].level.should.equal('warn');
    winston.loggers.get('http').transports['console'].colorize.should.be.ok;

    winston.loggers.get('http').transports['file'].level.should.equal('info');
    winston.loggers.get('http').transports['file'].colorize.should.be.not.ok;
    winston.loggers.get('http').transports['file'].filename.should.equal('http.log');

    // reset all loggers
    winston.loggers = new winston.Container();
  });

  it('throws an error if an incorrect path is given', function () {
    var winston = require('winston');

    require('../lib/winston-config').fromFile('./test.js', function (error) {
      should.exist(error);
    });

    // reset all loggers
    winston.loggers = new winston.Container();
  });

  it('return empty winston if an incorrect path is given on sync function', function () {
    var winston = require('winston');

    var logger = require('../lib/winston-config').fromFileSync('./test.js');

    logger.loggers.get('testsync').should.equal(winston.loggers.get('testsync'));
    logger.loggers.get('testsync').level.should.equal('info');

    // reset all loggers
    winston.loggers = new winston.Container();
    logger.loggers = new logger.Container();
  });

  it('return empty winston if a correct path is given with empty file on sync function', function () {
    var winston = require('winston');

    var logger = require('../lib/winston-config').fromFileSync(path.join(__dirname, './test-winston-config-empty.json'));

    logger.loggers.get('testsync').should.equal(winston.loggers.get('testsync'));
    logger.loggers.get('testsync').level.should.equal('info');

    // reset all loggers
    winston.loggers = new winston.Container();
    logger.loggers = new logger.Container();
  });

  it('returns a default logging level for console (winston default - info) for the not configured logging level', function () {

    require('../lib/winston-config').fromFile(__dirname + '/./test-winston-config-wo-level.json', function (error, winston) {
      if (error) {
        error.should.be.null;
      }

      should.exist(winston.loggers.get('testing'));

      winston.loggers.get('testing').transports['console'].level.should.equal('info');
      winston.loggers.get('testing').transports['console'].colorize.should.be.ok;
      winston.loggers.get('testing').transports['console'].timestamp.should.be.ok;

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

});
