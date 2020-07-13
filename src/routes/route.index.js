const express = require('express')
const router = express.Router()
const { ErrorHandler, handleError, ErrorTypes } = require("../helpers/errors");

const testRoutes = require('./route.test')
const docs = require("./route.documentation");
const user = require('./route.user')
const course = require('./route.course')
const lesson = require('./route.lesson')
const question = require('./route.question')


/**
 * @swagger
 *  # 1) Define the security scheme type (HTTP bearer)
 *  components:
 *    securitySchemes:
 *      bearerAuth:            # arbitrary name for the security scheme
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *    responses:
 *      CreationSuccess:
 *        description: "A 201 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Success message.
 *                  example: success
 *                statusCode:
 *                  type: number
 *                  description: "201 status code."
 *                  example: 201
 *                data:
 *                  type: string
 *                  nullable: true
 *                  example: null
 *                  description: Null value with no data
 *      NoContentSuccess:
 *        description: "A 200 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Success message.
 *                  example: success
 *                statusCode:
 *                  type: number
 *                  description: "200 status code."
 *                  example: 200
 *                data:
 *                  type: string
 *                  nullable: true
 *                  example: null
 *                  description: Null object with no data
 *      UnauthorizedError:
 *        description: "A 401 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error message.
 *                  example: error
 *                statusCode:
 *                  type: number
 *                  description: "401 status code."
 *                  example: 401
 *                message:
 *                  type: string
 *                  description: Not authorized.
 *                  example: Not authorized
 *      GeneralClientError:
 *        description: "A 400 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error message.
 *                  example: error
 *                statusCode:
 *                  type: number
 *                  description: "400 status code."
 *                  example: 400
 *                message:
 *                  type: string
 *                  description: Description on error.
 *                  example: Client error description
 *
 *      ObjectNotFound:
 *        description: "A 404 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error message.
 *                  example: error
 *                statusCode:
 *                  type: number
 *                  description: "404 status code."
 *                  example: 404
 *                message:
 *                  type: string
 *                  description: Object not found
 *                  example: Object not found
 *
 *      ForbiddenError:
 *        description: "A 403 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error message.
 *                  example: error
 *                statusCode:
 *                  type: number
 *                  description: "403 status code."
 *                  example: 403
 *                message:
 *                  type: string
 *                  description: Forbidden access
 *                  example: Forbidden access
 *
 *      GeneralServerError:
 *        description: "A 500 response code object"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error message.
 *                  example: error
 *                statusCode:
 *                  type: number
 *                  description: "500 status code."
 *                  example: 500
 *                message:
 *                  type: string
 *                  description: Description on error.
 *                  example: Server error description
 */

 //Middlware to check db connection
router.use((req, res, next) => {
	if (!global.dbConnectionUp) {
		return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, `Lost connection to DB`));
	} else {
		next();
	}
});

router.use('/courses', course)
router.use('/lessons', lesson)
router.use('/questions', question)
router.use('/test', testRoutes)
router.use('/docs', docs)
router.use('/user', user)


module.exports = router