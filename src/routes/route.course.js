const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/controllers.course");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");


router.post(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    fieldsInBodyValidation("courseId", "name", "numberCourse", "professor", "lessons"),
    CourseController.createCourse
);

router.get(
    "/student",
    authenticateJWT,
    authorizeRoles(role.Student),
    CourseController.getStudentCourses
);

router.get(
    "/lessons/student/:courseId",
    authenticateJWT,
    authorizeRoles(role.Student),
    CourseController.getStudentLessonsByCourse
);

module.exports = router