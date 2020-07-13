const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/controllers.course");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");

/**
 * @swagger
 * paths:
 *  /courses:
 *   get:
 *    tags: [Courses]
 *    summary: "Get all courses on the database"
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
 *                 $ref: '#/components/schemas/Course'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */  
router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    CourseController.getAllCourses
);

/**
 * @swagger
 * paths:
 *  /courses:
 *   post:
 *    tags: [Courses]
 *    summary: "Creates and saves a new course"
 *    security:
 *     -bearerAuth: []
 *    requestBody:
 *     description: Course object that is being created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Course'
 *    responses:
 *     "201":
 *      description: "Succesful insertion"
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Course'
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
    fieldsInBodyValidation("courseId", "name", "numberCourse", "professor", "lessons"),
    CourseController.createCourse
);

/**
 * @swagger
 * paths:
 *  /courses/:courseId:
 *   put:
 *    tags: [Courses]
 *    summary: "Update a course"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: courseId
 *        in: path
 *        description: Course's id from the desired group, it's not the _id
 *        required: true
 *        example: "C1"
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
 *                 $ref: '#/components/schemas/Course'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.put(
    "/:courseId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    CourseController.updateCourse
);

/**
 * @swagger
 * paths:
 *  /courses/courseId:
 *   delete:
 *    tags: [Courses]
 *    summary: "Deletes a course"
 *    security:
 *     -bearerAuth: []
 *    parameters:
 *      - name: courseId
 *        in: path
 *        description: Course's id from the desired group, it's not the _id
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
 *                 $ref: '#/components/schemas/Course'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */   
router.delete(
    "/:courseId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    CourseController.deleteCourse
);

/**
 * @swagger
 * paths:
 *  /courses/student:
 *   get:
 *    tags: [Courses]
 *    summary: "Get all student's courses on the database"
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
 *                 $ref: '#/components/schemas/Course'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */ 
router.get(
    "/student",
    authenticateJWT,
    authorizeRoles(role.Student),
    CourseController.getStudentCourses
);

/**
 * @swagger
 * paths:
 *  /courses/lessons/student/:courseId:
 *   get:
 *    tags: [Courses]
 *    summary: "Get all student's lessons in a specific course in the database"
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
 *                 $ref: '#/components/schemas/Course'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 *     "500":
 *       $ref: '#/components/responses/GeneralServerError'
 */ 
router.get(
    "/lessons/student/:courseId",
    authenticateJWT,
    authorizeRoles(role.Student),
    CourseController.getStudentLessonsByCourse
);

module.exports = router