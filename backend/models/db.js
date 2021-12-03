const Datastore = require('nedb');
exports.user = new Datastore({filename: './databases/user.db', autoload: true});
exports.token = new Datastore({filename: './databases/token.db', autoload: true});
exports.vehicle = new Datastore({filename: './databases/vehicle.db', autoload: true});
exports.singleCost = new Datastore({filename: './databases/singleCost.db', autoload: true});
exports.fuelCost = new Datastore({filename: './databases/fuelCost.db', autoload: true});
exports.repeatingCost = new Datastore({filename: './databases/repeatingCost.db', autoload: true});