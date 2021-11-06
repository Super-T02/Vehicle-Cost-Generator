const Datastore = require('nedb');
exports.user = new Datastore({filename: './databases/user.db', autoload: true});
exports.token = new Datastore({filename: './databases/token.db', autoload: true});