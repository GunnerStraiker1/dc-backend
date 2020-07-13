const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/controllers.course");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");


router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    CourseController.getAllCourses
);

router.post(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    fieldsInBodyValidation("courseId", "name", "numberCourse", "professor", "lessons"),
    CourseController.createCourse
);

router.put(
    "/:courseId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    CourseController.updateCourse
);

router.delete(
    "/:courseId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    CourseController.deleteCourse
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