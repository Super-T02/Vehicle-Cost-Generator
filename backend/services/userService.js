const userModel = require('../models/userModel');

/**
 * adds a user to the database
 * @param data
 * @param callback
 */
exports.addUser = (data, callback) => {
	userModel.createUser(data, (err, newUser) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, newUser);
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