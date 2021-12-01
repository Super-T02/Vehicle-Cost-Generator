const express = require('express');
const userService = require('../services/userService');
const {generateErrorMessage} = require('../util/error');
const authService = require('../services/authService');
const vehicle = require('./vehicle');
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

router.use('/:username',
	authService.authenticateJWT,
	userService.checkUser,
	userService.isUserPermitted
);
// Only paths needing a verified token !

router.get('/:username',  (req, res) => {
	const {username} = req.params;

	userService.getUser(username, (err, data) => {
		if (err) {
			res.status(500).json(generateErrorMessage('Internal Server Error', 'Server'));
		} else if (!data) {
			res.status(404).json(generateErrorMessage('Not able to find user', 'params'));
		} else {
			res.status(200).json(data);
		}
	});
});

router.use('/:username/vehicles', vehicle);

module.exports = router;