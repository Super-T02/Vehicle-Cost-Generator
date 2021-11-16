const vehicleModel = require('../models/vehicleModel');

/**
 * Get a list of all vehicles
 * @param req
 * @param callback
 */
exports.getAlLVehicles = (req, callback) => {
	const {user} = req.body;

	vehicleModel.getAllVehicles(user.username, (err, vehicles) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, vehicles);
		}
	});
};