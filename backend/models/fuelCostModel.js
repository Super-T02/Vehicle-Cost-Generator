const db = require('./db.js');

/**
 * Gets all sets for the fuel Cost of the specified query incl. vin
 * @param query
 * @param callback
 */
exports.getAllCostItems = (query, callback) => {
	db.fuelCost.find(query, (err, costs) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, costs);
		}
	});
};

/**
 * Inserts a new CostItem
 * @param costItem
 * @param callback
 */
exports.addCostItem = (costItem, callback) => {
	db.fuelCost.insert(costItem, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Find a specified id
 * @param id
 * @param callback
 */
exports.findID = (id, callback) => {
	db.fuelCost.find({id: id}, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

/**
 * Delete a Cost Item
 * @param id
 * @param callback
 */
exports.deleteCostItem = (id, callback) => {
	db.fuelCost.remove({id: id}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Modify a cost Item
 * @param id
 * @param updatedSet
 * @param callback
 */
exports.modifyCostItem = (id, updatedSet, callback) => {
	db.fuelCost.update({ id: id }, {$set: updatedSet}, {}, (err, numReplaced) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, numReplaced);
		}
	});
};

/**
 * Get a specific cost item by id
 * @param id
 * @param callback
 */
exports.getCostItem = (id, callback) => {
	db.fuelCost.find({id: id}, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};