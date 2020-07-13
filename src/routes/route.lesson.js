const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/controllers.lesson");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");
const { role } = require("../helpers/enums");

router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    LessonController.getAllLessons
);

router.post(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    fieldsInBodyValidation("lessonId", "name", "lessonNumber", "approvalScore", "questions"),
    LessonController.createLesson
);

router.put(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    LessonController.updateLesson
);

router.delete(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    LessonController.deleteLesson
);

router.get(
    "/details/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    LessonController.getLessonDetails
);

router.patch(
    "/take/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Student),
    contentTypeValidation,
    LessonController.takeLesson
);

module.exports = router