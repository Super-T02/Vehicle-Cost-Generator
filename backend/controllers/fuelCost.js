const express = require('express');
const {generateErrorMessage} = require('../util/error');
const fuelCostService = require('../services/fuelCostService');
const router = express.Router();

router.get('/', (req, res) => {
	fuelCostService.getAllCostItems(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else if (!data) {
			res.status(200).json([]);
		} else {
			res.status(200).json(data);
		}
	});
});

router.post('/', fuelCostService.checkPost, (req, res) => {
	fuelCostService.createCostItem(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else {
			res.status(201).json({});
		}
	});
});

router.use('/:id', fuelCostService.checkID);

// Only routes with ID !!!

router.get('/:id', (req, res) => {
	fuelCostService.getCostItem(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else if (!data) {
			res.status(404).json(generateErrorMessage('Not able to find id', 'Request Params'));
		} else {
			res.status(200).json(data);
		}
	});
});

router.delete('/:id', (req, res) => {
	fuelCostService.deleteCostItem(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else {
			res.status(204).json({});
		}
	});
});

router.put('/:id', fuelCostService.checkPost, (req, res) => {
	fuelCostService.updateCostItem(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else {
			if (err) {
				res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			} else if (!data) {
				res.status(400).json(generateErrorMessage('No data updated', 'Params'));
			} else {
				res.status(201).json({});
			}
		}
	});
});

module.exports = router;