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
 * Middleware for checking the required body to add a user.
 * @param req
 * @param res
 * @param next
 */
exports.checkNewUser = (req, res, next) => {
	const {username, email, password, role} = req.body;

	if (!username || typeof username !== 'string') {
		res.status(404).json({
			message: 'username should be a String'
		});
	} else if (!email || typeof email !== 'string') {
		res.status(404).json({
			message: 'email should be a String'
		});
	} else if (!password || typeof password !== 'string') { // TODO: Proving of the password
		res.status(404).json({
			message: 'password should be a String'
		});
	} else if (!role || (role !== 'admin' && role !== 'member')) {
		res.status(404).json({
			message: 'role should be "admin" or "member"'
		});
	} else {
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