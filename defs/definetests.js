const toml = require('toml');
const fs = require('fs');
const config = toml.parse(fs.readFileSync('./config/example_config.toml', 'utf-8'));
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(config.Giphy.apikey);

module.exports.config = config;
module.exports.giphy = giphy;