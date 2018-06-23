const config = require('../defs').config;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(config.Giphy.apikey);

module.exports.giphy = giphy;