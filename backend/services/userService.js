const userModel = require('../models/userModel');

/**
 * adds a user to the database
 * @param data
 * @param callback
 */
exports.addUser = (data, callback) => {
	userModel.createUser(data, (err, newUser) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, newUser);
		}
	});
};
