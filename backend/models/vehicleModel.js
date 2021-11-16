const db = require('./db.js');

/**
 * Get all vehicles for a given username
 * @param username
 * @param callback
 */
exports.getAllVehicles = (username, callback) => {
	db.vehicle.find({username: username}, (err, vehicles) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, vehicles);
		}
	});
};