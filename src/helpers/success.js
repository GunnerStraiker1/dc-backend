/**
 *	Class for HTTP success handling
 *
 * @class SuccessHandler
 */
class SuccessHandler {
	/**
	 * Creates an instance of SuccessHandler.
	 * @param {number} successType - Success HTTP code from SuccessType enum
	 * @param {Object} [data] - Object to attach to response or null if status code 204
	 * @memberof SuccessHandler
	 */
	constructor(successType, data) {
		this.statusCode = successType;
		this.data = data;
	}
}

const SuccessType = {
	GENERAL_SUCCESS: 200,
	CREATION: 201,
	NO_CONTENT: 204,
	PARTIAL_CONTENT: 206,
};

/**
 * Send formated success response
 *
 * @param {SuccessHandler} success - Instance of Sucess Handler class
 * @param {Express.Response} res - Express response object
 */
const handleSuccess = (success, res) => {
	const { statusCode, data } = success;
	res.status(statusCode).json({
		status: "success",
		statusCode,
		data,
	});
};

module.exports = {
	SuccessHandler,
	handleSuccess,
	SuccessType,
};
