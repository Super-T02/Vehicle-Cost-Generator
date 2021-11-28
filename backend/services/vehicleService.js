const vehicleModel = require('../models/vehicleModel');
const {validationResult, check} = require('express-validator');
const {generateErrorMessage} = require('../util/error');

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

/**
 * Add a new vehicle
 * @param req
 * @param callback
 */
exports.addNewVehicle = (req, callback) => {
	const {vehicle} = req.body;

	vehicleModel.addVehicle(vehicle, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, err);
		}
	});
};

exports.checkVehicle = async (req, res, next) => {
	await check('vin')
		.exists()
		.bail()
		.isString()
		.bail()
		.trim(' ')
		.toUpperCase()
		.custom() // TODO: exists?
		.run(req);
};
