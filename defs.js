"use strict";
exports.__esModule = true;
/* eslint-disable */
// Imports
//import * as admin from "firebase-admin";
var fs = require("fs");
var GphApiClient = require("giphy-js-sdk-core");
var toml = require("toml");
// import * as serviceAccount from "../firebasekey.json";
// Define Vars
var config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
//const serviceAccount = require("./firebasekey.json").catch(console.log('No Firebase Key'));
var giphy = GphApiClient(config.Giphy.apikey);
// Init
/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});*/
//const db = admin.firestore();
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
    }
};
/*
module.exports = {
    // Firebase
    setDoc(collection: string, doc: string, data: JSON) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }
        if (typeof doc !== "string") {
            throw new TypeError("Doc supplyed is not a string");
        }

        const docRef = db.collection(collection).doc(doc);

        const setdata = docRef.set(data);
    },
    addDoc(collection: string, data: JSON) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }

        const adddoc = db.collection(collection).add(data);
    },
    listDocs(collection: string) {
        if (typeof collection !== "string") {
            throw new TypeError("Collection supplyed is not a string");
        }
        db.collection(collection).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                });
            })
            .catch((err) => {
                throw new Error(`Error at listDocs: ${err}`);
            });
    },
    docExists(collection: string, doc: string) {
        const collectionref = db.collection(collection).doc(doc);
        const getdoc = collectionref.get()
            .then((document) => {
                if (!document.exists) {
                    return false;
                } else {
                    return true;
                }
            })
            .catch((err) => {
                throw new Error(`Error at docExists: ${err}`);
            });
}
}*/
