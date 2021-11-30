const express = require('express');
const vehicleService = require('../services/vehicleService');
const {generateErrorMessage} = require('../util/error');
const router = express.Router();

router.post('/', vehicleService.checkVehicle, (req, res) => {

	vehicleService.addNewVehicle(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(201).json({});
		}
	});
});

router.get('/', (req, res) => {

	vehicleService.getAlLVehicles(req, (err, vehicles) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(200).json(vehicles);
		}
	});
});

router.delete('/:vin', vehicleService.checkVinParam, (req, res) => {
	vehicleService.deleteVehicle(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(204).json({});
		}
	});
});

module.exports = router;