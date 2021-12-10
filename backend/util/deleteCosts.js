const singleCostModel = require('../models/singleCostModel');
const fuelCostModel = require('../models/fuelCostModel');
const repeatingCostModel = require('../models/repeatingCostModel');
const vehicleModel = require('../models/vehicleModel');

/**
 * Deletes all costs for this vin
 * @param vin
 * @returns {Promise<void>}
 */
exports.deleteAllCosts = async (vin) => {
	await new Promise((resolve, reject) => {
		singleCostModel.getAllCostItems({vin: vin}, async (err, costItems) => {
			if (err) {
				reject('DB Error');
			} else {

				for (const costItem of costItems) {
					await new Promise((resolve1) => {
						singleCostModel.deleteCostItem(costItem.id, (err) => {
							if (err) {
								reject('DB Error');
							} else  {
								resolve1();
							}
						});
					});
				}
				resolve();
			}
		});
	});

	await new Promise((resolve, reject) => {
		fuelCostModel.getAllCostItems({vin: vin}, async (err, costItems) => {
			if (err) {
				reject('DB Error');
			} else {

				for (const costItem of costItems) {
					await new Promise((resolve1) => {
						fuelCostModel.deleteCostItem(costItem.id, (err) => {
							if (err) {
								reject('DB Error');
							} else  {
								resolve1();
							}
						});
					});
				}
				resolve();
			}
		});
	});

	await new Promise((resolve, reject) => {
		repeatingCostModel.getAllCostItems({vin: vin}, async (err, costItems) => {
			if (err) {
				reject('DB Error');
			} else {

				for (const costItem of costItems) {
					await new Promise((resolve1) => {
						repeatingCostModel.deleteCostItem(costItem.id, (err) => {
							if (err) {
								reject('DB Error');
							} else  {
								resolve1();
							}
						});
					});
				}
				resolve();
			}
		});
	});

};

/**
 * Deletes all vehicles for a given user
 * @param username
 * @returns {Promise<void>}
 */
exports.deleteAllVehicles = async (username) => {
	await new Promise((resolve, reject) => {
		vehicleModel.getAllVehicles({username: username}, async (err, vehicles) => {
			if (err) {
				reject('DB Error');
			} else {

				for (const vehicle of vehicles) {
					await new Promise((resolve1) => {
						vehicleModel.deleteVehicle(vehicle.id, (err) => {
							if (err) {
								reject('DB Error');
							} else  {
								resolve1();
							}
						});
					});
				}
				resolve();
			}
		});
	});
};