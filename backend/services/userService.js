const userModel = require('../models/userModel');
const {validationResult, check} = require('express-validator');

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
		.custom(value => {
			return new Promise( (resolve, reject) => {
				userModel.existsUser(value, (err, exists) => {
					if (err || exists) {
						reject('Username already exists');
					} else {
						resolve();
					}
				});
			});
		})
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
		.custom(value => {
			return new Promise( (resolve, reject) => {
				userModel.existsEmail(value, (err, exists) => {
					if (err || exists) {
						reject('Email already used');
					} else {
						resolve();
					}
				});
			});
		})
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
			id: '',
			username: username,
			email: email,
			password: password,
			role: role
		};

		next();
	}
};