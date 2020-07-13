const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/controllers.question");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");

/**
 * @swagger
 * paths:
 *  /questions:
 *   get:
 *    tags: [Questions]
 *    summary: "Get all questions on the database"
 *    security:
 *     -bearerAuth: []
 *    responses:
 *     "200":
 *      description: "Successful Query"
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             statusCode:
 *               type: number
 *               example: 200
 *             data: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    QuestionController.getAllQuestions
);

/**
 * @swagger
 * paths:
 *  /questions:
 *   post:
 *    tags: [Questions]
 *    summary: "Creates and saves a new question"
 *    security:
 *     -bearerAuth: []
 *    requestBody:
 *     description: Question object that is being created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Question'
 *    responses:
 *     "201":
 *      description: "Succesful insertion"
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Question'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */
router.post(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    fieldsInBodyValidation("questionId", "textQuestion", "score", "answerType", "correctAnswers", "wrongAnswers"),
    QuestionController.createQuestion
);

/**
 * @swagger
 * paths:
 *  /questions/:questionId:
 *   put:
 *    tags: [Questions]
 *    summary: "Update a question"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: questionId
 *        in: path
 *        description: Question's id from the desired group, it's not the _id
 *        required: true
 *        example: "Q1"
 *    responses:
 *     "201":
 *      description: "Successful update"
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             statusCode:
 *               type: number
 *               example: 201
 *             data: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.put(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    QuestionController.updateQuestion
);

/**
 * @swagger
 * paths:
 *  /questions/:questionId:
 *   delete:
 *    tags: [Questions]
 *    summary: "Deletes a question"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: questionId
 *        in: path
 *        description: Question's id from the desired group, it's not the _id
 *        required: true
 *        example: "Q1"
 *    responses:
 *     "200":
 *      description: "Successful Delete"
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             statusCode:
 *               type: number
 *               example: 200
 *             data: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.delete(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    QuestionController.deleteQuestion
);

module.exports = router