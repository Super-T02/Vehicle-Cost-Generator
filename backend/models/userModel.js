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
 * Checks whether the given username is used or not
 * @param username
 * @param callback
 */
exports.existsUser = (username, callback) => {
	db.user.find({username: username}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data.length > 0);
		}
	});
};

/**
 * Checks whether the given email is used or not
 * @param email
 * @param callback
 */
exports.existsEmail = (email, callback) => {
	db.user.find({email: email}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data.length > 0);
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

