const { ErrorHandler, ErrorTypes } = require("../errors");

/**
 *	Composing function to create middleware for role authorization
 *
 * @param {...string} roles - User roles to check for, multiples values can be passed
 * @returns {Function} Middlewares to check for authorization
 */

function authorizeRoles(...roles) {
	/**
	 *  Middleware to check for role authorization
	 *
	 * @param {Express.Request} req - Express request object
	 * @param {Express.Response} res - Express response object
	 * @param {Function} next - Next function to continue into next middleware
	 * @returns {Function} Next function to continue into next middleware
	 */

	function authorizeRole(req, res, next) {
		if (roles.length < 1) return next();

		if (!req.user) {
			return next(new ErrorHandler(ErrorTypes.NOT_AUTHORIZED));
		}

		const hasRole = roles.some((role) => req.user.userRoles.includes(role));

		if (!hasRole) {
			return next(new ErrorHandler(ErrorTypes.FORBIDDEN));
		}

		return next();
	}

	return authorizeRole;
}

module.exports = authorizeRoles;
