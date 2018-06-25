"use strict";
exports.__esModule = true;
/* eslint-disable */
// Imports
var fs = require("fs");
var GphApiClient = require("giphy-js-sdk-core");
var toml = require("toml");
// import * as serviceAccount from "../firebasekey.json";
// Define Vars
var config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
exports.config = config;
var giphy = GphApiClient(config.Giphy.apikey);
exports.giphy = giphy;
function textToArray(path) {
    if (typeof path !== "string") {
        throw new TypeError("Path supplyed is not a string");
    }
    var text = fs.readFileSync(path, "utf-8");
    var textByLine = text.split("\n");
    return textByLine;
}
exports.textToArray = textToArray;
