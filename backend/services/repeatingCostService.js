const repeatingCostModel = require('../models/repeatingCostModel');
const {validationResult, check, body} = require('express-validator');
const uuid = require('uuid');

/**
 * Get all cost items with a query
 * @param req
 * @param callback
 */
exports.getAllCostItems = (req, callback) => {
	const query = req.query;
	query.vin = req.vin;
	query.username = req.username;

	repeatingCostModel.getAllCostItems(query, (err, data) => {
		if (err) {
			callback(err, null);
		} else if (data.length === 0) {
			callback(null, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Get cost Item with specific id
 * @param req
 * @param callback
 */
exports.getCostItem = (req, callback) => {
	repeatingCostModel.getCostItem(req.id, (err, data) => {
		if (err) {
			callback(err, null);
		} else if (data.length === 0) {
			callback(null, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Creates a new cost item
 * @param req
 * @param callback
 */
exports.createCostItem = (req, callback) => {
	const {costItem} = req;

	costItem.id = uuid.v4();
	costItem.username = req.username;
	costItem.vin = req.vin;

	repeatingCostModel.addCostItem(costItem, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Deletes a cost item
 * @param req
 * @param callback
 */
exports.deleteCostItem = (req, callback) => {
	repeatingCostModel.deleteCostItem(req.id, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Updates a cost item
 * @param req
 * @param callback
 */
exports.updateCostItem = (req, callback) => {
	const {costItem} = req;

	costItem.id = req.id;
	costItem.username = req.username;
	costItem.vin = req.vin;

	repeatingCostModel.modifyCostItem(req.id, costItem, (err, numReplaced) => {
		if (err) {
			callback(err, null);
		} else if (numReplaced === 0) {
			callback(null, null);
		} else {
			callback(null, numReplaced);
		}
	});
};



/**
 * Middleware to check the the post of a cost item
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkPost = async (req, res, next) => {
	await check('price')
		.exists()
		.bail()
		.isNumeric()
		.bail()
		.custom(value => {
			if (value < 0) {
				return Promise.reject('Negative price');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	await check('date')
		.exists()
		.bail()
		.isString()
		.run(req);

	await check('period')
		.exists()
		.bail()
		.isString()
		.run(req);

	await check('name')
		.exists()
		.bail()
		.isString()
		.run(req);

	await check('description')
		.if(body('description').exists())
		.if(() => req.body.description)
		.isString()
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		const {
			price,
			date,
			period,
			name,
			description
		} = req.body;

		req.costItem = {
			price: price,
			date: date,
			period: period,
			name: name,
			description: description
		};

		next();
	}
};

/**
 * Middleware to check the id in parameter
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkID = async (req, res, next) => {
	await check('id')
		.exists()
		.bail()
		.isString()
		.bail()
		.trim()
		.escape()
		.custom(value => existsID(value))
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		req.id = req.params.id;
		next();
	}
};

/**
 * Checks whether the given id exists or not, resolves if it does exist
 * @returns {Promise<unknown>}
 * @param id
 */
const existsID = async (id) => {
	return new Promise((resolve, reject) => {
		repeatingCostModel.findID(id, (err, result) => {
			if (err) {
				reject('Internal Server Error');
			} else if (result.length === 0) {
				reject('ID doesn\'t exists');
			} else {
				resolve();
			}
		});
	});
};
