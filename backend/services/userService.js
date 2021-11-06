const userModel = require('../models/userModel');

exports.addUser = (req, res, callback) => {
	userModel.createUser(req.body, (err, newUser) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, newUser);
		}
	});
};