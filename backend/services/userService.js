const userModel = require('../models/userModel');
const {validationResult, check} = require('express-validator');
const {generateErrorMessage} = require('../util/error');
const deleteVehicle = require('../util/deleteVehicles');

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
 * Get the user passed with the given username
 * @param username
 * @param callback
 */
exports.getUser = (username, callback) => {
	userModel.getUserData(username, (err, data) => {
		if (err) {
			callback(err, null);
		} else if (data.length !== 1) {
			callback(null, null);
		} else {
			callback(null, data);
		}
	});
};

/**
 * Updates a user with given username and full Set
 * @param req
 * @param callback
 */
exports.updateUser = (req, callback) => {
	const {newUser} = req.body;

	userModel.modifyUser(newUser.username, newUser, (err, numReplaced) => {
		if (err) {
			callback(err, null);
		} else if (numReplaced === 0) {
			callback(null, null);
		} else {
			callback(null, numReplaced);
		}
	});
};

/**
 * Delete a user via username
 * @param req
 * @param callback
 */
exports.deleteUser = (req, callback) => {
	const {username} = req;

	userModel.deleteUser(username, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			deleteVehicle.deleteAllVehicles(username).then(callback(null, data));
		}
	});
};

/**
 * Middleware for checking the required body to add a user.
 * @param req
 * @param res
 * @param next
 */
exports.checkNewUser = async (req, res, next) => {
	await check('username')
		.exists()
		.bail()
		.isString()
		.trim(' ')
		.toLowerCase()
		.custom(value => inUse(value))
		.run(req);

	await check('password')
		.exists()
		.bail()
		.custom(value => {
			// eslint-disable-next-line no-useless-escape
			if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/.exec(value)) {
				return Promise.reject('Password does not match the pattern!');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	await check('email')
		.exists()
		.bail()
		.isEmail()
		.not().custom(value => existsUserMail(value))
		.run(req);

	await check('role')
		.exists()
		.bail()
		.custom(value => {
			if (value !== 'member' && value !== 'admin') {
				return Promise.reject('Role is not admin or member');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		const {username, email, role, password} = req.body;

		req.body.newUser = {
			username: username,
			email: email,
			password: password,
			role: role
		};

		next();
	}

};

/**
 * Middleware for checking the required body to update a user.
 * @param req
 * @param res
 * @param next
 */
exports.checkUpdateUser = async (req, res, next) => {
	await check('username')
		.exists()
		.bail()
		.isString()
		.trim(' ')
		.toLowerCase()
		.run(req);

	await check('password')
		.exists()
		.bail()
		.custom(value => {
			// eslint-disable-next-line no-useless-escape
			if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/.exec(value)) {
				return Promise.reject('Password does not match the pattern!');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	await check('email')
		.exists()
		.bail()
		.isEmail()
		.not().custom(value => existsUserMail(value))
		.run(req);

	await check('role')
		.exists()
		.bail()
		.custom(value => {
			if (value !== 'member' && value !== 'admin') {
				return Promise.reject('Role is not admin or member');
			} else {
				return Promise.resolve();
			}
		})
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		const {username, email, role, password} = req.body;

		req.body.newUser = {
			username: username,
			email: email,
			password: password,
			role: role
		};

		next();
	}

};

/**
 * Middleware for checking the username param to be a string and trim it to lower case
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.checkUser = async (req, res, next) => {
	await check('username')
		.exists()
		.bail()
		.isString()
		.bail()
		.trim(' ')
		.toLowerCase()
		.custom(value => existsUser(value))
		.run(req);
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	} else {
		req.body.username = req.params.username.toLowerCase();
		req.username = req.params.username.toLowerCase();
		next();
	}
};

/**
 * Middleware checking whether the user is the same as in the token
 * @param req
 * @param res
 * @param next
 */
exports.isUserPermitted = (req, res, next) => {
	const {user} = req.body;

	if (req.params.username !== user.username && user.role !== 'admin') {
		res.status(403).json(generateErrorMessage('Not the needed Permission', 'Header'));
	} else {
		next();
	}
};

/**
 * Checks if there exists any user with the given username
 * @param username
 * @returns {Promise<unknown>}
 */
const existsUser = async (username) => {
	return new Promise( (resolve, reject) => {
		userModel.getUserData(username, (err, data) => {
			if (err) {
				reject('Internal Error');
			} else if (data.length === 0) {
				reject('No user found with this username');
			} else {
				resolve();
			}
		});
	});
};

/**
 * Checks if there exists any user with the given username
 * @param username
 * @returns {Promise<unknown>}
 */
const inUse = async (username) => {
	return new Promise( (resolve, reject) => {
		userModel.getUserData(username, (err, data) => {
			if (err) {
				reject('Internal Error');
			} else if (data.length !== 0) {
				reject('User all ready in use');
			} else {
				resolve();
			}
		});
	});
};

/**
 * Checks if there exists any user with the given email
 * @returns {Promise<unknown>}
 * @param email
 */
const existsUserMail = async (email) => {
	return new Promise( (resolve, reject) => {
		userModel.getUserData(email, (err, data) => {
			if (err) {
				reject('Internal Server Error');
			} else if (data.length === 0) {
				reject('No user found with this email');
			} else {
				resolve();
			}
		});
	});
};