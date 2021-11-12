const express = require('express');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const router = express.Router();

router.post('/login', authService.checkLoginData, (req, res) => {
	const { username, password } = req.body;
	authService.login({ username: username, password: password }, (err, user) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});		} else if (!user) {
			res.status(404).json({
				err: 'Password or Username doesn\'t match'
			});
		} else {

			// Generate the actual user data
			let actualUser = {
				username: user.username,
				role: user.role
			};

			// Generate the tokens
			const accessToken = authService.generateAccessToken(actualUser);
			authService.generateRefreshToken(actualUser, (err, refreshToken) => {
				if (err) {
					res.status(500).json({
						message: err.message
					});
				} else {
					res.status(200).json({
						accessToken: accessToken,
						refreshToken: refreshToken
					});
				}
			});
		}
	});
});

router.post('/token', authService.checkRefreshToken, (req, res) => {
	const { token } = req.body;

	jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			res.status(403).json({
				message: 'Forbidden'
			});
		} else {
			const actualUser = {
				username: user.username,
				role: user.role
			};

			res.status(200).json({
				accessToken: authService.generateAccessToken(actualUser)
			});
		}
	});
});

router.post('/logout', authService.checkRefreshToken, (req, res) => {
	const {token} = req.body;

	authService.removeRefreshToken(token, (err) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});		} else {
			res.status(200).json({
				message: 'Logout successful'
			});
		}
	});
});

module.exports = router;
