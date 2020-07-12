const passport = require("passport");
//Local strategy
const localStrategy = require("passport-local").Strategy;

//JWT Strategy
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

//JWT Signing package
const jwt = require("jsonwebtoken");
//User model
const User = require("../database/models/models.user");

//-----------------------------------------------------------------------------------------
//Set up for passport login strategy
passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				//Find the user associated with the email provided by the user
				const foundUser = await User.findOne({ email: email });
				if (!foundUser) {
					//If the user isn't found in the database, return a message
					return done(null, false, {
						message: "User was not found in DB",
					});
				}
				//Validate password and make sure it matches with the corresponding hash stored in the database
				//If the passwords match, it returns a value of true.
				const validate = await foundUser.checkPassword(password);

				if (!validate) {
					return done(null, foundUser, {
						message: "Password is incorrect",
					});
				}

				//Check if last password reset needs updating
				//You could also force a time based password reset in this config
				//By comparing current time to save time, if > by a certain amount

				// if (!foundUser.lastPasswordReset) {
				// 	return done(null, foundUser, {
				// 		message: "Password reset required",
				// 	});
				// }

				//Update lastLogin

				// foundUser.lastLogin = Date.now();

				await foundUser.save();

				//Send the user information to the next middleware
				return done(null, foundUser, {
					message: "Logged in Successfully",
				});
			} catch (error) {
				return done(error);
			}
		}
	)
);
//-----------------------------------------------------------------------------------------
//Set up for JWT Passport strategy

const JWTOptions = {
	//Secret used to sing JWWT
	secretOrKey: process.env.JWT_KEY,
	//we expect the user to send the token as a query parameter with the name 'secret_token'
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	algorithms: ["HS256"],
};

passport.use(
	//This verifies that the token sent by the user is valid
	new JWTstrategy(JWTOptions, async (jwt_payload, done) => {
		try {
			//Pass the token details to the next middleware
			return done(null, jwt_payload);
		} catch (error) {
			done(error);
		}
	})
);
//-----------------------------------------------------------------------------------------

/**
 *	Create a JWT with set payload
 *
 * @static
 * @param {string} userId - User ID to insert into JWT
 * @param {[string]} userRoles - Array of user roles to insert into JWT
 * @returns {string} JWT to send in response
 * @memberof UserStore
 */
function createToken(userId, userRoles) {
	try {
		const payload = {
			userId: userId,
			userRoles: userRoles,
			iat: Math.floor(Date.now() / 1000), //Issued time in UNIX
			exp: Math.floor(Date.now() / 1000) + 3600, //Expiration time in UNIX
		};

		const JWT = jwt.sign(payload, process.env.JWT_KEY);

		return JWT;
	} catch (error) {
		return new Error("Error in token creation");
	}
}

module.exports = createToken;
