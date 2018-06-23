'use strict';
exports.__esModule = true;
/* eslint-disable */
// Imports
var admin = require("firebase-admin");
var fs = require("fs");
var GphApiClient = require("giphy-js-sdk-core");
var toml = require("toml");
// import * as serviceAccount from "../firebasekey.json";
// Define Vars
var config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
var serviceAccount = require("./firebasekey.json");
var giphy = GphApiClient(config.Giphy.apikey);
// Init
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
// Exports
module.exports = {
    config: config,
    giphy: giphy,
    // Useful Functions
    textToArray: function (path) {
        if (typeof path !== "string") {
            throw new TypeError("Path supplyed is not a string");
        }
        var text = fs.readFileSync(path, "utf-8");
        var textByLine = text.split("\n");
        return textByLine;
    },
    // Firebase
    setDoc: function (collection, doc, data) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }
        if (typeof doc !== "string") {
            throw new TypeError("Doc supplyed is not a string");
        }
        var docRef = db.collection(collection).doc(doc);
        var setdata = docRef.set(data);
    },
    addDoc: function (collection, data) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }
        var adddoc = db.collection(collection).add(data);
    },
    listDocs: function (collection) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }
        db.collection(collection).get()
            .then(function (snapshot) {
            snapshot.forEach(function (doc) {
                console.log(doc.id, "=>", doc.data());
            });
        })["catch"](function (err) {
            throw new Error("Error at listDocs: " + err);
        });
    },
    docExists: function (collection, doc) {
        var collectionref = db.collection(collection).doc(doc);
        var getdoc = collectionref.get()
            .then(function (document) {
            if (!document.exists) {
                return false;
            }
            else {
                return true;
            }
        })["catch"](function (err) {
            throw new Error("Error at docExists: " + err);
        });
    }
};
