"use strict";
exports.__esModule = true;
/* eslint-disable */
var admin = require("firebase-admin");
var maindefs_1 = require("./maindefs");
var db;
if (maindefs_1.config.PerServerDB.enable !== true) {
    throw new Error("PerServerDB is disabled");
}
function init(filename) {
    if (typeof filename !== "string") {
        throw new TypeError("filename is not a string");
    }
    var serviceAccount = require("./" + filename);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
}
exports.init = init;
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
