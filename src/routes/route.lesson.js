const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/controllers.lesson");
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
    fieldsInBodyValidation("lessonId", "name", "lessonNumber", "approvalScore", "questions"),
    LessonController.createLesson
);

router.get(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    LessonController.getLessonDetails
);

router.post(
    "/take/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    contentTypeValidation,
    LessonController.takeLesson
);

module.exports = router