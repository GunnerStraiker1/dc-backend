const { ErrorHandler, ErrorTypes } = require("../errors");
const passport = require("passport");

/**
 *  Middleware to check authentication with JWT, if correct will add user field to req with token info
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Function} next - Next function to continue into next middleware
 * @returns {Function} Next function to continue into next middleware
 */
function authenticateJWT(req, res, next) {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		try {
			// If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
			if (err || !user) {
				throw new Error();
			} else {
				req.user = user;
				return next();
			}
		} catch (error) {
			return next(new ErrorHandler(ErrorTypes.NOT_AUTHORIZED));
		}
	})(req, res, next);
}

module.exports = authenticateJWT;
