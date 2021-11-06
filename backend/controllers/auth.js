const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const authService = require('../services/authService');
const userService = require('../services/userService');

const router = express.Router();

router.post('/login', userService.checkLoginData, (req, res) => {
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

			if (user.length === 0) {
				res.status(404).json({
					err: 'Password or Username doesn\'t match'
				});
			} else {
				const accessToken = authService.generateAccessToken(actualUser);

				authService.generateRefreshToken(actualUser, (err, refreshToken) => {
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

router.post('/token', authService.checkRefreshToken, (req, res) => {
	const { token } = req.body;

	jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const actualUser = {
				username: user.username,
				role: user.role
			};

			res.json({
				accessToken: authService.generateAccessToken(actualUser)
			});
		}
	});
});

router.post('/logout', authService.checkRefreshToken, (req, res) => {
	const {token} = req.body;

	authService.removeRefreshToken(token, (err) => {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json({
				message: 'Logout successful'
			});
		}
	});
});

module.exports = router;
