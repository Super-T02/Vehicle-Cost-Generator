const db = require('./db');

/**
 * Saves the given token into the database
 * @param refreshToken
 * @param callback
 */
exports.saveRefreshToken = (refreshToken, callback) => {
	db.token.insert({refreshToken: refreshToken}, (err, token) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, token.refreshToken);
		}
	});
};

/**
 * checks whether the refresh token exists or not
 * @param refreshToken
 * @param callback
 */
exports.checkRefreshToken = (refreshToken, callback) => {
	db.token.find(t => t.refreshToken === refreshToken, (err, data) => {
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
	db.token.remove(t => t.refreshToken === token, (err) => {
		if (err) {
			callback(err);
		} else {
			callback(null);
		}
	});
};