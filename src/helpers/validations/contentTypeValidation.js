const { ErrorHandler, ErrorTypes } = require("../errors");

/**
 *  Middleware to validate if incoming request content type is JSON
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Function} next - Next function to continue into next middleware
 */
const validateContentType = (req, res, next) => {
	try {
		if (!req.is("application/json")) {
			throw new Error();
		} else {
			return next();
		}
	} catch (error) {
		return next(new ErrorHandler(ErrorTypes.INVALID_CONTENT_TYPE, "req", "application/json"));
	}
}

module.exports = validateContentType;
