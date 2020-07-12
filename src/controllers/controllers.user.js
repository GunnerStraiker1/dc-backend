const { ErrorHandler, ErrorTypes } = require("../helpers/errors");
const { SuccessHandler, SuccessType, handleSuccess } = require("../helpers/success");
const passport = require("passport");
const createToken = require("../store/store.auth");
const UserStore = require("../store/store.user");
const path = require("path");

class UserController {

    /**
	 * Middleware to handle request to POST /login
	 *
	 * @static
	 * @param {Express.Request} req - Express request object
	 * @param {Express.Response} res - Express response object
	 * @param {Function} next - Next function to continue into next middleware
	 * @memberof UserController
	 */
    static postLoginUser(req, res, next) {
        passport.authenticate("login", async (err, user, info) => {
            try {
                if (err) {
                    throw err;
                }
                if (info) {
                    switch (info.message) {
                        case "User was not found in DB":
                            return next(new ErrorHandler(ErrorTypes.OBJECT_NOT_FOUND, "User"));

                        case "Password is incorrect":
                            return next(new ErrorHandler(ErrorTypes.NOT_AUTHORIZED));

                        case "Password reset required":
                            return next(new ErrorHandler(ErrorTypes.PASSWORD_RESET_REQUIRED));
                    }
                }

                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        return next(new ErrorHandler(ErrorTypes.NOT_AUTHORIZED));
                    }

                    //Sign the JWT token and populate the payload
                    const token = createToken(user.userId, user.roles);

                    handleSuccess(
                        new SuccessHandler(SuccessType.GENERAL_SUCCESS, {
                            token: token,
                        }),
                        res
                    );
                });
            } catch (error) {
                console.error(error);
                //Migth change to something new, not really not authorized
                //More like error in authoritazion process
                return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR));
            }
        })(req, res, next);
    }
}

module.exports = UserController