/* eslint-disable */
// Imports
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as GphApiClient from "giphy-js-sdk-core";
import * as toml from "toml";
// import * as serviceAccount from "../firebasekey.json";

// Define Vars
const config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
const giphy = GphApiClient(config.Giphy.apikey);

// Init

/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});*/

// const db = admin.firestore();

// Exports

export { giphy };
export { config };
export function textToArray(path: string) {
    if (typeof path !== "string") {
        throw new TypeError("Path supplyed is not a string");
    }
    const text = fs.readFileSync(path, "utf-8");
    const textByLine = text.split("\n");
    return textByLine;
}
let db;
let serviceAccount;
if (config.PerServerDB.enable === true) {
    serviceAccount = require("./firebasekey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    db = admin.firestore();
}
export function setDoc(collection: string, doc: string, data: JSON) {
    if (typeof collection !== "string") {
        throw new TypeError("Collection supplyed is not a string");
    }
    if (typeof doc !== "string") {
        throw new TypeError("Doc supplyed is not a string");
    }

    const docRef = db.collection(collection).doc(doc);

    const setdata = docRef.set(data);
}
export function addDoc(collection: string, data: JSON) {
    if (typeof collection !== "string") {
        throw new TypeError("Collection supplyed is not a string");
    }

    const adddoc = db.collection(collection).add(data);
}
export function listDocs(collection: string) {
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
}
export function docExists(collection: string, doc: string) {
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
