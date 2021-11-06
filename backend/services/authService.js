const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

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