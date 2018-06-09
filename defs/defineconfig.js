const toml = require('toml')
const fs = require('fs')
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
module.exports.config = config;