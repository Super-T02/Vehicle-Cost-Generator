const singleCostModel = require('../models/singleCostModel');

/**
 * Deletes all costs for this vin
 * @param vin
 * @returns {Promise<void>}
 */
exports.deleteAllCosts = async (vin) => {
	await new Promise((resolve, reject) => {
		singleCostModel.getAllCostItems({vin: vin}, async (err, costItems) => {
			if (err) {
				// TODO: logg err
				reject('DB Error');
			} else {

				for (const costItem of costItems) {
					await new Promise((resolve1) => {
						singleCostModel.deleteCostItem(costItem.id, (err, data) => {
							if (err) {
								// TODO: logg err
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

	// Delete next

};