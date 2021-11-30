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

router.put('/:vin', vehicleService.checkVinParam, vehicleService.checkVehicle, (req, res) => {
	vehicleService.updateVehicle(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else if (!data) {
			res.status(400).json(generateErrorMessage('No data updated', 'Params'));
		} else {
			res.status(201).json({});
		}
	});
});

module.exports = router;