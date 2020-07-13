const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/controllers.lesson");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");

/**
 * @swagger
 * paths:
 *  /lessons:
 *   get:
 *    tags: [Lessons]
 *    summary: "Get all lessons on the database"
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
 *                 $ref: '#/components/schemas/Lesson'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */
router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    LessonController.getAllLessons
);

/**
 * @swagger
 * paths:
 *  /lessons:
 *   post:
 *    tags: [Lessons]
 *    summary: "Creates and saves a new lesson"
 *    security:
 *     -bearerAuth: []
 *    requestBody:
 *     description: Lesson object that is being created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Lesson'
 *    responses:
 *     "201":
 *      description: "Succesful insertion"
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Lesson'
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
    fieldsInBodyValidation("lessonId", "name", "lessonNumber", "approvalScore", "questions"),
    LessonController.createLesson
);


/**
 * @swagger
 * paths:
 *  /lessons/:lessonId:
 *   put:
 *    tags: [Lessons]
 *    summary: "Update a lesson"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: lessonId
 *        in: path
 *        description: Lesson's id from the desired group, it's not the _id
 *        required: true
 *        example: "L1"
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
 *                 $ref: '#/components/schemas/Lesson'
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
    LessonController.updateLesson
);

/**
 * @swagger
 * paths:
 *  /lessons/lessonId:
 *   delete:
 *    tags: [Lessons]
 *    summary: "Deletes a lesson"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: lessonId
 *        in: path
 *        description: Lesson's id from the desired group, it's not the _id
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
 *                 $ref: '#/components/schemas/Lesson'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */ 
router.delete(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    LessonController.deleteLesson
);

/**
 * @swagger
 * paths:
 *  /lessons/details/:lessonId:
 *   get:
 *    tags: [Lessons]
 *    summary: "Get all lesson's details on the database"
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
 *                 $ref: '#/components/schemas/Lesson'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */ 
router.get(
    "/details/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    LessonController.getLessonDetails
);

/**
 * @swagger
 * paths:
 *  /lessons/take/:lessonId:
 *   patch:
 *    tags: [Lessons]
 *    summary: "Student take a lesson"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: lessonId
 *        in: path
 *        description: Lesson's id from the desired group, it's not the _id
 *        required: true
 *        example: "L1"
 *    responses:
 *     "201":
 *      description: "Successful insertion"
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
 *               type: object
 *               example: {"message": "You have reached the approval score, now you can start a new Lesson", "score": 15,"update": { "n": 1, "nModified": 1}, "electionId": "7fffffff0000000000000004", "ok": 1, "operationTime": "6849029053798678529"}
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.patch(
    "/take/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    contentTypeValidation,
    LessonController.takeLesson
);

module.exports = router