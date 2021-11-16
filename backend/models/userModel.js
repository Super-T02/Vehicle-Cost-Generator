const db = require('./db.js');
const uuid = require('uuid');

/**
 * Adds the given User to the database
 * @param userData
 * @param callback
 */
exports.createUser = (userData, callback) => {
	userData.id = uuid.v1();

	db.user.insert(userData, (err, newUser) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, newUser);
		}
	});
};

/**
 * Gets the data of the given user
 * @param username
 * @param callback
 */
exports.getUserData = (username, callback) => {
	db.user.find({username: username}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Gets all users with the given email
 * @param email
 * @param callback
 */
exports.getUserWithEmail = (email, callback) => {
	db.user.find({email: email}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
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

