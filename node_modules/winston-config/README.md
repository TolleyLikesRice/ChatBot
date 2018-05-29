# winston-config

[![Build Status](https://travis-ci.org/triplem/winston-config.png?branch=master)](http://travis-ci.org/triplem/winston-config) [![Dependency Status](https://gemnasium.com/triplem/winston-config.png)](https://gemnasium.com/triplem/winston-config) [![NPM version](https://badge.fury.io/js/winston-config.png)](http://badge.fury.io/js/winston-config) [![Coverage Status](https://coveralls.io/repos/triplem/winston-config/badge.png)](https://coveralls.io/r/triplem/winston-config)

A module to easily configure [winston](http://github.com/flatiron/winston) via json files.

## Motivation
[winston](https://github.com/flatiron/winston) is designed to be a simple and universal logging library with support for multiple transports. There is IMHO a need to easily configure this fine logging library via easy json files, without the need of working with the winston api.

winston-config offers configuration of multiple winston loggers via json files.

## Usage
You do have to put the `winston` dependency into your package.json. winston-config will not work correctly without this dependency in your package.json. This is due to the [module caching caveats](http://nodejs.org/api/modules.html#modules_module_caching_caveats) of the nodejs module loading. winston-config does not install a dependency to winston, this makes sure, that winston-config is using the same module as your application (see also [Modules Loading from Node Modules folders](http://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)).

Otherwise the used winston module would be another file and therefor it would not be the cached one used by your application and therefor the configuration could not be as easily used in your application. (Unfortunately this is quite hard to test in the test cases and therefor no test for this is in the test-cases).

winston-config can be used like described below:

``` js
  var path = require('path')
    , winstonConf = require('winston-config');

  winstonConf.fromFile(path.join(__dirname, '../config/example-winston-config.json'), callback(error, winston) {
    if (error) {
      console.log('error during winston configuration');
    } else {
      console.log('everything alright');
    }
  });
```

Right now, winston-config offers the following methods:

* `fromFile`
calling a json-file and using it for the configuration of winston. This is an async method.

* `fromJson`
accepts a JS Object to configure winston (well in reality this method is called by the `fromFile` and does nothing else then adding the config to winston). This method is an async method.

* `fromFileSync`
does pretty much the same as the fromFile method, but does this synchronously. This is especially useful for the initialization phase of an application. This method logs errors via console.log and returns always a valid winston instance. The returned winston instance is configured with the given file configuration if everything went okay, otherwise an untouched winston instance is returned.

If you do have the requirement to just use a single logger, you could use [build-winston](http://github.com/flexbean/build-winston). We are right now in discussions to merge these two projects.

A configuration file should look like (see directory config or test):

``` js
{
  "logging": {
    "application": {
      "console": {
        "level": "info",
        "colorize": true
      },
      "file": {
        "timestamp": true,
        "json": false,
        "filename": "logs/app.log",
        "maxfiles": 5,
        "maxsize": 10485760,
        "level": "info"
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
  }
}
```

The `logging` is the only fixed one (but not for fromFile, this function will cause problems with `logging`), all other can be adapted by the user of the library. After the call to the winston-config with a correct filename (using the above configuration), the logger can be called via

``` js
var winston = require('winston');

var appLogger = winston.loggers.get('application');
var httpLogger = winston.loggers.get('http');

// this will appear in the console as well as the logs/app.log file
appLogger.info('LOGMESSAGE');

// this will not appear in the console, but in the logs/http.log file
httpLogger.info('ANOTHER LOGMESSAGE');
```

Like already stated, the name `application` can be configured. If there is no configuration for this logger, the default values of winston are used. The default transport is always `console` and the default level is `silly` if there is no logger configured, if it is configured without a level, the level `info` is used.

If you would like to use other logging transports instead of console and/or file, feel free to configure those by name, but make sure, that you do require those before the first usage of winston in your application.

Detailed information can be found in the tests for this project.

Hope it helps, and you are able to use it. If there are any problems, do not hesitate to open an issue or write a message to the author of this project.

An application using this module is [Agora](https://github.com/softwerkskammer/NeuePlattform-Implementierung) from the Softwerkskammer Germany.

## LICENSE

Copyright (c) 2013 Markus M. May

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
