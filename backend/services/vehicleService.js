const vehicleModel = require('../models/vehicleModel');
const {validationResult, check} = require('express-validator');
const {generateErrorMessage} = require('../util/error');
const {run} = require('nodemon/lib/monitor');

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

/**
 * Checks the vehicle Data
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.checkVehicle = async (req, res, next) => {
	await check('vin')
		.exists()
		.bail()
		.isString()
		.bail()
		.trim(' ')
		.toUpperCase()
		.custom(value => existsVin(value)) // TODO: exists?
		.run(req);

	await check('year')
		.isNumeric()
		.bail()
		.custom(value => {
			if (value < 1000 || value > 3000) {
				return Promise.reject('No valid year!');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	await check('make')
		.isString()
		.run(req);

	await check('model')
		.isString()
		.run(req);

	await check('type')
		.isString()
		.run(req);

	await check('color')
		.isString()
		.run(req);

	await check('weight')
		.isNumeric()
		.bail()
		.custom(value => {
			if (value < 0) {
				return Promise.reject('Negative weight');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	await check('dimensions.height')
		.isNumeric()
		.run(req);

	await check('dimensions.width')
		.isNumeric()
		.run(req);

	await check('dimensions.length')
		.isNumeric()
		.run(req);

	await check('license')
		.isString()
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		req.body.vehicle = {
			vin: req.body.vin,
			year: req.body.year,
			make: req.body.make,
			model: req.body.model,
			type: req.body.type,
			color: req.body.color,
			weight: req.body.weight,
			dimensions: req.body.dimensions,
			license: req.body.license
		};
		next();
	}
};



/**
 * Checks whether the given vin exists or not, resolves if it doesn't exist
 * @param vin
 * @returns {Promise<unknown>}
 */
const existsVin = async (vin) => {
	return new Promise((resolve, reject) => {
		vehicleModel.findVin(vin, (err, result) => {
			if (err) {
				reject('Internal Server Error');
			} else if (result.length !== 0) {
				reject('VIN already exists');
			} else {
				resolve();
			}

		});
	});
};
