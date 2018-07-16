"use strict";
exports.__esModule = true;
/* eslint-disable */
// Imports
var fs_1 = require("fs");
var GphApiClient = require("giphy-js-sdk-core");
var request_1 = require("request");
var toml_1 = require("toml");
// import * as serviceAccount from "../firebasekey.json";
// Define Vars
var config = toml_1.parse(fs_1.readFileSync("./config/config.toml", "utf-8"));
exports.config = config;
var giphy = GphApiClient(config.Giphy.apikey);
exports.giphy = giphy;
function textToArray(path) {
    if (typeof path !== "string") {
        throw new TypeError("Path supplyed is not a string");
    }
    var text = fs_1.readFileSync(path, "utf-8");
    var textByLine = text.split("\n");
    return textByLine;
}
exports.textToArray = textToArray;
function checkLink(link) {
    request_1.post({
        url: "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDWTb1kHSOaCXC9giBQ4zSAMoXVGeVubTM",
        json: {
            client: {
                clientId: "chatbot",
                clientVersion: "2.0.0"
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [
                    { url: link },
                ]
            }
        }
    }, function (err, res, body) {
        if (err) {
            throw console.log(err);
        }
        if (body !== {}) {
            return body;
        }
        else if (body === {}) {
            return null;
        }
        else {
            return new Error("Sorry, there was an error in reciving your request");
        }
    });
}
exports.checkLink = checkLink;
