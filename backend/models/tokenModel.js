const jwt = require('jsonwebtoken');
const db = require('./db');

/**
 * Saves the given token into the database
 * @param refreshToken
 * @param callback
 */
exports.saveRefreshToken = (refreshToken, callback) => {
	const decoded = jwt.decode(refreshToken);
	console.log(decoded);
	db.token.remove({username: decoded.username, refreshToken: refreshToken}, (err) => {
		if (err) {
			callback(err, null);
		} else {
			db.token.insert({username: decoded.username, refreshToken: refreshToken}, (err, token) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, token.refreshToken);
				}
			});
		}
	});
};

/**
 * checks whether the refresh token exists or not
 * @param refreshToken
 * @param callback
 */
exports.checkRefreshToken = (refreshToken, callback) => {
	db.token.find({refreshToken: refreshToken}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * removes a refresh token from the database
 * @param token
 * @param callback
 */
exports.removeRefreshToken = (token, callback) => {
	db.token.remove({refreshToken: token}, (err) => {
		if (err) {
			callback(err);
		} else {
			callback(null);
		}
	});
};