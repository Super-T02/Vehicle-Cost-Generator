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

/**
 * Inserts a new vehicle to the database
 * @param vehicle
 * @param callback
 */
exports.addVehicle = (vehicle, callback) => {
	db.vehicle.insert(vehicle, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Delivers all vehicles with the given VIN
 * @param vin
 * @param callback
 */
exports.findVin = (vin, callback) => {
	db.vehicle.find({vin: vin}, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

/**
 * Deletes a Vehicle via vin (primary key)
 * @param vin
 * @param callback
 */
exports.deleteVehicle = (vin, callback) => {
	db.vehicle.remove({vin: vin}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};