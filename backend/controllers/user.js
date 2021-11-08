const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post('/', userService.checkNewUser, (req, res) => {

	userService.addUser(req.body.newUser, (err, data) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json(data);
		}
	});
});

module.exports = router;