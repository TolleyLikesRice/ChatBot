'use strict';
exports.__esModule = true;
var admin = require('firebase-admin');
var serviceAccount = require('../firebasekey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
module.exports.db = db;
module.exports = {
  setDoc: function (collection, doc, data) {
    if (typeof collection != 'string') {
      throw new TypeError('Collection supplyed is not a string');
    }
    if (typeof doc != 'string') {
      throw new TypeError('Doc supplyed is not a string');
    }
    var docRef = db.collection(collection).doc(doc);
    var setdata = docRef.set(data);
  },
  addDoc: function (collection, data) {
    if (typeof collection != 'string') {
      throw new TypeError('Collection supplyed is not a string');
    }
    var adddoc = db.collection(collection).add(data);
  },
  listDocs: function (collection) {
    if (typeof collection != 'string') {
      throw new TypeError('Collection supplyed is not a string');
    }
    db.collection(collection).get()
      .then(function (snapshot) {
        snapshot.forEach(function (doc) {
          console.log(doc.id, '=>', doc.data());
        });
      })['catch'](function (err) {
        throw new Error('Error at listDocs: ' + err);
      });
  },
  docExists: function (collection, doc) {
    var collectionref = db.collection(collection).doc(doc);
    var getdoc = collectionref.get()
      .then(function (doc) {
        if (!doc.exists) {
          return false;
        }
        else {
          return true;
        }
      })['catch'](function (err) {
        throw new Error('Error at docExists: ' + err);
      });
  }
};
