/**
 * generates a basic error message
 * @param msg
 * @param errLocation
 * @returns {{errors: [{msg, location}]}}
 */
exports.generateErrorMessage = (msg, errLocation) => {
	return {
		errors: [{
			msg: msg,
			location: errLocation
		}]
	};
};