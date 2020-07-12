const { ErrorHandler, ErrorTypes } = require("../errors");

/**
 *	Composing function to create middleware for body fields verification
 *
 * @param {string} properties - Properties check for, multiples values can be passed
 * @returns {Function} Middlewares to check for body properties
 */
function checkFieldInBodyExistence(...properties) {
	/**
	 *  Middleware to check for required properties in body
	 *
	 * @param {Express.Request} req - Express request object
	 * @param {Express.Response} res - Express response object
	 * @param {Function} next - Next function to continue into next middleware
	 * @returns {Function} Next function to continue into next middleware
	 */
	function checkFieldExistence(req, res, next) {
		if (!req.body) next(new ErrorHandler(ErrorTypes.MISSING_FIELD, "body"));

		for (let val of properties) {
			if (!req.body.hasOwnProperty(val)) {
				next(new ErrorHandler(ErrorTypes.MISSING_FIELD, val));
			}
		}

		return next();
	}

	return checkFieldExistence;
}

module.exports = checkFieldInBodyExistence;
