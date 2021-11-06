const db = require('./db.js');
const uuid = require('uuid');

/**
 * Adds the given User to the database
 * @param userData
 * @param callback
 */
exports.createUser = (userData, callback) => {
	const user = {
		id: uuid.v1(),
		username: userData.username,
		email: userData.email,
		password: userData.password,
		role: userData.role
	};

	db.user.insert(user, (err, newUser) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, newUser);
		}
	});
};

/**
 * Checks if there is a user with the given password and username in the database
 * @param loginData
 * @param callback
 */
exports.checkLogin = (loginData, callback) => {

	db.user.find({username: loginData.username, password: loginData.password}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};
