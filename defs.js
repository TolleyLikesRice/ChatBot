"use strict";
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
var db;
var serviceAccount;
if (config.PerServerDB.enable === true) {
    serviceAccount = require("./firebasekey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
}
function setDoc(collection, doc, data) {
    if (typeof collection !== "string") {
        throw new TypeError("Collection supplyed is not a string");
    }
    if (typeof doc !== "string") {
        throw new TypeError("Doc supplyed is not a string");
    }
    var docRef = db.collection(collection).doc(doc);
    var setdata = docRef.set(data);
}
exports.setDoc = setDoc;
function addDoc(collection, data) {
    if (typeof collection !== "string") {
        throw new TypeError("Collection supplyed is not a string");
    }
    var adddoc = db.collection(collection).add(data);
}
exports.addDoc = addDoc;
function listDocs(collection) {
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
}
exports.listDocs = listDocs;
function docExists(collection, doc) {
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
exports.docExists = docExists;
