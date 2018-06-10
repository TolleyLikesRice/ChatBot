const Datastore = require('nedb')
const config = require('../../defs/defineconfig').config
exports.run = (client, message, args) => {
    db = new Datastore({ filename: 'databases/userinfo.db', autoload: true })

    db.find({ "Role": "Owner" }, function (err, docs) {
        insertOwn(docs)
    });

    function insertOwn(docOut) {

        if (isEmpty(docOut)) {
            var owner = client.users.get(config.Bot.ownerid);
            var ownername = owner.username
            db.insert({
                "User": `${ownername}`,
                "Role": "Owner",
                "user_id": `${config.Bot.ownerid}`,
                "_id": "1"
            })

        }

    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['iu'],
    permLevel: 4
};

exports.help = {
    name: 'importusers',
    description: 'Adds all non-existing users to the user database.',
    usage: 'importusers'
};