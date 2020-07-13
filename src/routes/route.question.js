const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/controllers.question");
const contentTypeValidation = require("../helpers/validations/contentTypeValidation");
const fieldsInBodyValidation = require("../helpers/validations/bodyValidation");
const authenticateJWT = require("../helpers/validations/JWTValidation");
const authorizeRoles = require("../helpers/validations/rolesValidation");

router.get(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    QuestionController.getAllQuestions
);

router.post(
    "/",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    fieldsInBodyValidation("questionId", "textQuestion", "score", "answerType", "correctAnswers", "wrongAnswers"),
    QuestionController.createQuestion
);

router.put(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    contentTypeValidation,
    QuestionController.updateQuestion
);

router.delete(
    "/:lessonId",
    authenticateJWT,
    authorizeRoles(role.Professor),
    QuestionController.deleteQuestion
);

module.exports = router