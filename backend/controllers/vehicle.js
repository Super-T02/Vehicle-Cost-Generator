const express = require('express');
const vehicleService = require('../services/vehicleService');
const {generateErrorMessage} = require('../util/error');
const router = express.Router();

router.get('/', ((req, res) => {
	vehicleService.getAlLVehicles(req, (err, vehicles) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(200).json(vehicles);
		}
	});
}));

module.exports = router;