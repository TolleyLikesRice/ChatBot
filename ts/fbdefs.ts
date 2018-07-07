/* eslint-disable */
import * as admin from "firebase-admin";
import { exists, writeFileSync } from "fs";
import { config } from "./maindefs";
let db;

if (config.PerServerDB.enable !== true) {
  throw new Error("PerServerDB is disabled");
}

export function init(filename: string) {
  const file = ".fb_use_env";
  exists(file, (exist) => {
    if (exist) {
      console.log("Using env var");
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.fbid,
          clientEmail: process.env.fbe,
          privateKey: process.env.fbpk,
        }),
      });
    } else {
      console.log("No env var");
      if (typeof filename !== "string") {
        throw new TypeError("filename is not a string");
      }
      const serviceAccount = require(`./${filename}`);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      db = admin.firestore();
    }
  });
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
