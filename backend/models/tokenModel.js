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

exports.checkRefreshToken = (refreshToken, callback) => {
    db.token.find(t => t.refreshToken === refreshToken, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};