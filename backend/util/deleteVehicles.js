const vehicleModel = require('../models/vehicleModel');
const deleteCosts = require('./deleteCosts');

/**
 * Deletes all vehicles for a given user
 * @param username
 * @returns {Promise<void>}
 */
exports.deleteAllVehicles = async (username) => {
	await new Promise((resolve, reject) => {
		vehicleModel.getAllVehicles(username, async (err, vehicles) => {
			if (err) {
				reject('DB Error');
			} else {
				for (const vehicle of vehicles) {
					await new Promise((resolve1) => {
						vehicleModel.deleteVehicle(vehicle.vin, (err) => {
							if (err) {
								reject('DB Error');
							} else  {
								deleteCosts.deleteAllCosts(vehicle.vin).then(() => resolve1());
							}
						});
					});
				}
				resolve();
			}
		});
	});
};