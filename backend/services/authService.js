const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');
const userModel = require('../models/userModel');

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

	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
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
exports.checkLoginData = (req, res, next) => {
	const {username, password} = req.body;

	if (!username) {
		res.status(400).json({
			message: 'username is empty'
		});
	} else if (typeof username != 'string') {
		res.status(400).json({
			message: 'username should be a string'
		});
	} else if (!password) {
		res.status(400).json({
			message: 'password is empty'
		});
	} else if (typeof password != 'string') {
		res.status(400).json({
			message: 'password should be a string'
		});
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
exports.checkRefreshToken = (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		res.sendStatus(401);
	} else {
		tokenModel.checkRefreshToken(token, (err, data) => {
			if (err) {
				res.sendStatus(500);
			} else if (data.length === 0) {
				res.sendStatus(403);
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
		res.sendStatus(401);
	} else {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.body.user = user;
			next();
		});
	}
};