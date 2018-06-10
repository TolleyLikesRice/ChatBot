const Datastore = require('nedb')
db = new Datastore({ filename: 'databases/userinfo.db', autoload: true })

db.find({ "Role": "Owner" }, function (err, docs) {
    insertOwn(docs)
});

function insertOwn(docOut) {

    if (isEmpty(docOut)) {
        prolog.warn('Owner not defined in database. Please run the updatestats command.');
    }
}
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
