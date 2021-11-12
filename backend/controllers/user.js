const express = require('express');
const userService = require('../services/userService');
const {generateErrorMessage} = require('../util/error');
const router = express.Router();

router.post('/', userService.checkNewUser, (req, res) => {

	userService.addUser(req.body.newUser, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else {
			res.status(201).json({});
		}
	});
});

module.exports = router;