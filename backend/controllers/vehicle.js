const express = require('express');
const vehicleService = require('../services/vehicleService');
const {generateErrorMessage} = require('../util/error');
const router = express.Router();
const singleCosts = require('./singleCost');
const fuelCosts = require('./fuelCost');
const repeatingCosts = require('./repeatingCost');

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

router.use('/:vin', vehicleService.checkVinParam);

// Only paths with vin as param!

router.get('/:vin', (req, res) => {

	vehicleService.getVehicle(req, (err, vehicle) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else if (!vehicle) {
			res.status(404).json(generateErrorMessage('Not able to find vin', 'Request Params'));
		} else {
			res.status(200).json(vehicle);
		}
	});
});

router.delete('/:vin', (req, res) => {
	vehicleService.deleteVehicle(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(204).json({});
		}
	});
});

router.put('/:vin', vehicleService.checkVehicle, (req, res) => {
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

router.use('/:vin/singleCosts', singleCosts);
router.use('/:vin/fuelCosts', fuelCosts);
router.use('/:vin/repeatingCosts', repeatingCosts);

module.exports = router;