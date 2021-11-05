const Datastore = require('nedb');
exports.echo = new Datastore({ filename: './databases/echo.db', autoload: true });
exports.user = new Datastore({filename: './databases/user.db', autoload: true});
exports.token = new Datastore({filename: './databases/token.db', autoload: true});