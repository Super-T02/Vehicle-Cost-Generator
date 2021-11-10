const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post('/', userService.checkNewUser, (req, res) => {

	userService.addUser(req.body.newUser, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else {
			res.status(201).json({
				message: 'User created successfully'
			});
		}
	});
});

module.exports = router;