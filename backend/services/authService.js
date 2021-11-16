const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');
const userModel = require('../models/userModel');
const {check, validationResult} = require('express-validator');
const {generateErrorMessage} = require('../util/error');

/**
 * Handles the login for a user
 * @param loginData
 * @param callback
 */
exports.login = (loginData, callback) =>{
	userModel.checkLogin(loginData, (err, user) => {
		if (err || user.length > 1) {
			callback(err, null);
		} else if (user.length === 0) {
			callback(null, null);
		} else {
			callback(null, user[0]);
		}
	});
};

/**
 * Generates a access token for the given User
 * @param user
 */
exports.generateAccessToken = (user) => {
	// Payload sent with the jwt
	const payload = {
		username: user.username,
		role: user.role
	};

	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'});
};

/**
 * Generates a refresh token for the given User
 * @param user
 * @param callback
 */
exports.generateRefreshToken = (user, callback) => {
	// Payload sent with the jwt
	const payload = {
		username: user.username,
		role: user.role
	};

	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
	tokenModel.saveRefreshToken(refreshToken, (err, token) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, token);
		}
	});
};

/**
 * Removes a refresh token
 * @param token
 * @param callback
 */
exports.removeRefreshToken = (token, callback) => {
	tokenModel.removeRefreshToken(token, (err) => {
		if (err) {
			callback(err);
		} else {
			callback(null);
		}
	});
};

/**
 * Middleware for checking the body of a login request
 * @param req
 * @param res
 * @param next
 */
exports.checkLoginData = async (req, res, next) => {
	await check('username')
		.exists()
		.bail()
		.isString()
		.bail()
		.trim(' ')
		.toLowerCase()
		.run(req);

	await check('password')
		.exists()
		.bail()
		.isString()
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		next();
	}
};

/**
 * Middleware for checking if there is a valid refresh token
 * @param req
 * @param res
 * @param next
 */
exports.checkRefreshToken = async (req, res, next) => {
	await check('token')
		.exists()
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		tokenModel.checkRefreshToken(req.body.token, (err, data) => {
			if (err) {
				res.status(500).json(generateErrorMessage('Internal Server Error','server'));
			} else if (data.length === 0) {
				res.status(403).json(generateErrorMessage('Not the needed Permission', 'header'));
			} else {
				next();
			}
		});
	}
};

/**
 * Middleware for authenticate a user.
 * After successful authentication the user data in the jwt payload will be
 * saved in the Request body in the variable 'user' ==> (req.body.user).
 * @param req
 * @param res
 * @param next
 */
exports.authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({});
	} else {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json(generateErrorMessage('Not verified', 'Header'));
			}

			req.body.user = user;
			next();
		});
	}
};