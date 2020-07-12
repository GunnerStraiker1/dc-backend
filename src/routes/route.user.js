const express = require("express");
const router = express.Router();
const UserController = require("../controllers/controllers.user");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");

/**
 * @swagger
 *  /user/login:
 *    post:
 *      tags:
 *      - User
 *      summary: "Logs user into the system"
 *      description: "Route to log user into API, obtaining JWT"
 *      operationId: "loginUser"
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    description: Email to authenticate.
 *                  password:
 *                    type: string
 *                    description: Password to authenticate.
 *              example:
 *                email: john_doe@gmail.com
 *                password: "password"
 *      responses:
 *        "200":
 *          description: "Success message with included JWT"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: Success message.
 *                    example: success
 *                  statusCode:
 *                    type: number
 *                    description: 200 status code.
 *                    example: 200
 *                  data:
 *                    type: object
 *                    description: Null object with no data
 *                    properties:
 *                      token:
 *                        type: string
 *                        description: JWT for authentication, expiration 1 hour from creation.
 *                        example: eyJhbGciOiJIUzI1NiIJ9.eyJzdWIiOM5MDIyfQ.SflKxwRJSMeOk6yJV_adQssw5c
 *        "400":
 *          $ref: '#/components/responses/GeneralClientError'
 *
 *        "500":
 *          $ref: '#/components/responses/GeneralServerError'
 */

router.post("/login", contentTypeValidation, fieldsInBodyValidation("email", "password"), UserController.postLoginUser);

module.exports = router