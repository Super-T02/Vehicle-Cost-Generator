const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const { generateAccessToken, generateRefreshToken } = require('../services/authService');

const router = express.Router();

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	let actualUser;

	userModel.checkLogin({ username: username, password: password }, (err, user) => {
		if (err) {
			res.sendStatus(500);
		} else {
			actualUser = {
				username: user.username,
				role: user.role
			};

			if (!actualUser) {
				res.status(404).json({
					err: 'Password or Username doesn\'t match'
				});
			} else {
				const accessToken = generateAccessToken(actualUser);

				generateRefreshToken(actualUser, (err, refreshToken) => {
					if (err) {
						res.sendStatus(500);
					} else {
						res.status(200).json({
							accessToken: accessToken,
							refreshToken: refreshToken
						});
					}
				});
			}
		}
	});
});

router.post('/token', (req, res) => {
	const { token } = req.body;

	if (!token) {
		res.sendStatus(401);
	} else {
		tokenModel.checkRefreshToken(token, (err, data) => {
			if (err) {
				res.sendStatus(500);
			} else if (!data) {
				res.sendStatus(403);
			} else {
				jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
					if (err) {
						res.sendStatus(403);
					} else {
						const actualUser = {
							username: user.username,
							role: user.role
						};

						res.json({
							accessToken: generateAccessToken(actualUser)
						});
					}
				});
			}
		});
	}
});

router.post('/logout', (req, res) => {
	const { token } = req.body;
	// TODO: function for removing refreshtoken from db

	res.status(200).json({
		message: 'Logout successful'
	});
});

module.exports = router;
