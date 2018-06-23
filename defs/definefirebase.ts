import * as admin from "firebase-admin"

var serviceAccount = require('../firebasekey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
module.exports.db = db
module.exports = {
    setDoc: function (collection: string, doc: string, data: JSON) {
        if (typeof collection != 'string') {
            throw new TypeError('Collection supplyed is not a string')
        }
        if (typeof doc != 'string') {
            throw new TypeError('Doc supplyed is not a string')
        }

        var docRef = db.collection(collection).doc(doc);

        var setdata = docRef.set(data);
    },
    addDoc: function (collection: string, data: JSON) {
        if (typeof collection != 'string') {
            throw new TypeError('Collection supplyed is not a string')
        }

        var adddoc = db.collection(collection).add(data)
    },
    listDocs: function (collection: string) {
        if (typeof collection != 'string') {
            throw new TypeError('Collection supplyed is not a string')
        }
        db.collection(collection).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                });
            })
            .catch((err) => {
                throw new Error(`Error at listDocs: ${err}`);
            });
    },
    docExists: function (collection: string, doc: string) {
        var collectionref = db.collection(collection).doc(doc);
        var getdoc = collectionref.get()
            .then(doc => {
                if (!doc.exists) {
                    return false
                } else {
                    return true
                }
            })
            .catch(err => {
                throw new Error(`Error at docExists: ${err}`)
            })

    }
}