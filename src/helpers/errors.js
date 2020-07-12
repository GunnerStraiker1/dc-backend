/**
 *	Class for HTTP error handling
 *
 * @class ErrorHandler
 * @extends {Error}
 */
class ErrorHandler extends Error {
	/**
	 * Creates an instance of ErrorHandler.
	 * @param {number} errorType - Error number from ErrorTypes enum
	 * @param {string} arg1 - String to add onto message
	 * @param {string} arg2 - String to add onto message
	 * @memberof ErrorHandler
	 */
	constructor(errorType, arg1, arg2) {
		super();

		const builtError = this.getError(errorType, arg1, arg2);

		this.statusCode = builtError.status;
		this.message = builtError.description;
	}

	/**
	 * Get error information
	 *
	 * @param {number} errorType - Error number from ErrorTypes enum
	 * @param {string} arg1 - String to add onto message
	 * @param {string} arg2 - String to add onto message
	 * @returns {Object} Object with status and description
	 * @memberof ErrorHandler
	 */
	getError(errorType, arg1 = "", arg2 = "") {
		const errorObj = {
			status: 400,
			description: "",
		};

		switch (errorType) {
			case ErrorTypes.DATABASE_ERROR: {
				errorObj.description = `${arg1}`;
				errorObj.status = 500;
				break;
			}
			case ErrorTypes.OBJECT_NOT_FOUND: {
				errorObj.description = `Object ${arg1} not found`;
				errorObj.status = 404;
				break;
			}
			case ErrorTypes.MISSING_FIELD: {
				errorObj.description = `Field ${arg1} is missing`;
				break;
			}
			case ErrorTypes.SHORT_STRING: {
				errorObj.description = `Field ${arg1} length is too short. Min ${arg2} chars`;
				break;
			}
			case ErrorTypes.INVALID_ID: {
				errorObj.description = `${arg1} (${arg2}) is not a valid Id`;
				break;
			}
			case ErrorTypes.INVALID_DATA_TYPE: {
				errorObj.description = `${arg1} is not of type ${arg2}`;
				break;
			}
			case ErrorTypes.INVALID_LENGTH: {
				errorObj.description = `${arg1} should have length ${arg2}`;
				break;
			}
			case ErrorTypes.INVALID_FORMAT: {
				errorObj.description = `${arg1} should follow ${arg2} format`;
				break;
			}
			case ErrorTypes.DATE_ORDER: {
				errorObj.description = `${arg1} should be after or equal to ${arg2}`;
				break;
			}
			case ErrorTypes.NESTED_OBJECT_NOT_FOUND: {
				errorObj.description = `Object ${arg1} not fournd in ${arg2}`;
				break;
			}
			case ErrorTypes.LONG_STRING: {
				errorObj.description = `Field ${arg1} length is too long. Max ${arg2} chars`;
				break;
			}
			case ErrorTypes.NUMBER_LOWER_BOUND: {
				errorObj.description = `Field ${arg1} is too small. Min ${arg2} `;
				break;
			}
			case ErrorTypes.NUMBER_UPPER_BOUND: {
				errorObj.description = `Field ${arg1} is too big. Max ${arg2}`;
				break;
			}
			case ErrorTypes.INVALID_NUMBER: {
				errorObj.description = `Field ${arg1} should be ${arg2}`;
				break;
			}
			case ErrorTypes.INVALID_ENUM_FIELD: {
				errorObj.description = `Field ${arg1} should belong to ${arg2} enum`;
				break;
			}
			case ErrorTypes.INVALID_ENCODING: {
				errorObj.description = `Field ${arg1} should use ${arg2}`;
				break;
			}
			case ErrorTypes.NOT_AUTHORIZED: {
				errorObj.description = `Not authorized`;
				errorObj.status = 401;
				break;
			}
			case ErrorTypes.INVALID_URL: {
				errorObj.description = `Field \'${arg1}\' requires a valid URL.`;
				break;
			}
			case ErrorTypes.DATE_IN_FUTURE: {
				errorObj.description = `Date \'${arg1}\' cannot be in the future. Current date: ${arg2}`;
				break;
			}
			case ErrorTypes.INVALID_CHARSET: {
				errorObj.description = `Field ${arg1} should use ${arg2} characters`;
				break;
			}
			case ErrorTypes.INVALID_ROUTE: {
				errorObj.status = 404;
				errorObj.description = `Endpoint ${arg1} not found`;
				break;
			}

			case ErrorTypes.INVALID_CONTENT_TYPE: {
				errorObj.status = 415;
				errorObj.description = `${arg1} content-type is not ${arg2}`;
				break;
			}

			case ErrorTypes.PASSWORD_RESET_REQUIRED: {
				errorObj.status = 401;
				errorObj.description = `A password reset is required`;
				break;
			}
			case ErrorTypes.EXPIRED_RESET_TOKEN: {
				errorObj.status = 401;
				errorObj.description = `The reset token is invalid or has expired`;
				break;
			}
			case ErrorTypes.DUPLICATED_VALUES: {
				(errorObj.status = 422),
					(errorObj.description = `You currently have a record in database with the same value in ${arg1} field`);
				break;
			}
			case ErrorTypes.CUSTOM_ERROR: {
				errorObj.description = `${arg1}`;
				break;
			}
			case ErrorTypes.FORBIDDEN_RESOURCE: {
				errorObj.status = 403;
				errorObj.description = `Resource ${arg1} is forbidden for the user ${arg2}`;
				break;
			}
			case ErrorTypes.FORBIDDEN: {
				errorObj.description = `Your roles are not authorized to perform this action${
					arg1 !== "" ? ": " + arg1 : ""
				}`;
				errorObj.status = 403;
				break;
			}
			default: {
				errorObj.description = "Unknown error" + (arg1 ? `: ${arg1}` : "");
				errorObj.status = 500;
			}
		}

		return errorObj;
	}
}

const ErrorTypes = {
	DATABASE_ERROR: 0,
	OBJECT_NOT_FOUND: 1,
	MISSING_FIELD: 2,
	SHORT_STRING: 3,
	INVALID_ID: 4,
	INVALID_DATA_TYPE: 5,
	INVALID_LENGTH: 6,
	INVALID_FORMAT: 7,
	DATE_ORDER: 8,
	NESTED_OBJECT_NOT_FOUND: 9,
	LONG_STRING: 10,
	NUMBER_LOWER_BOUND: 11,
	NUMBER_UPPER_BOUND: 12,
	INVALID_NUMBER: 13,
	INVALID_ENUM_FIELD: 14,
	INVALID_ENCODING: 15,
	NOT_AUTHORIZED: 16,
	INVALID_URL: 17,
	INVALID_CHARSET: 18,
	DATE_IN_FUTURE: 19,
	INVALID_ROUTE: 20,
	INVALID_CONTENT_TYPE: 21,
	PASSWORD_RESET_REQUIRED: 22,
	EXPIRED_RESET_TOKEN: 23,
	DUPLICATED_VALUES: 24,
	CUSTOM_ERROR: 25,
	FORBIDDEN_RESOURCE: 26,
	FORBIDDEN: 27,
};

/**
 * Send formated error response
 *
 * @param {ErrorHandler} err - Instance of Error Handler class
 * @param {Express.Response} res - Express response object
 */
const handleError = (err, res) => {
	let { statusCode = 500, message } = err;

	//Log internal server errors
	if (statusCode === 500) {
		console.error(err);

		//Override message so client does not get extra information about the system
		message = "Unexpected server error. Please try again later";
	}

	res.status(statusCode).json({
		status: "error",
		statusCode,
		message,
	});
};

module.exports = {
	ErrorHandler,
	handleError,
	ErrorTypes,
};

