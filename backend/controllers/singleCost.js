const express = require('express');
const {generateErrorMessage} = require('../util/error');
const singleCostService = require('../services/singleCostService');
const router = express.Router();

router.get('/', (req, res) => {
	singleCostService.getAllCostItems(req, (err, data) => {
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

router.post('/', singleCostService.checkPost, (req, res) => {
	singleCostService.createCostItem(req, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
			console.log(err);
		} else {
			res.status(201).json({});
		}
	});
});

router.use('/:id', singleCostService.checkID);

// Only routes with ID !!!

router.get('/:id', (req, res) => {
	singleCostService.getCostItem(req, (err, data) => {
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
	singleCostService.deleteCostItem(req, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(204).json({});
		}
	});
});

router.put('/:id', singleCostService.checkPost, (req, res) => {
	singleCostService.updateCostItem(req, (err, data) => {
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