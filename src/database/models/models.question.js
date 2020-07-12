const mongoose = require("mongoose")
const { answerTypeTypes } = require("../../helpers/enums");

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: "object"
 *       required: [questionId, textQuestion, score, answerType]
 *       properties:
 *         questionId:
 *           type: String
 *           example: "Q1"
 *         textQuestion:
 *           type: String
 *           example: "¿Cuanto es 1 + 1?"
 *         score:
 *           type: Number
 *           example: 10
 *         answerType:
 *           type: string
 *           enums:
 *             -Bool
 *             -OneAnswer
 *             -MoreOneAnswer
 *             -AllAnswers
 *           example: "OneAnswer"
 *         correctAnswers:
 *           type: array
 *           items:
 *             type: String
 *           example: ["2"]
 *         wrongAnswers:
 *           type: array
 *           items:
 *             type: String
 *           example: ["5", "4", "3"]
 */
const questionSchema = mongoose.Schema({
    questionId:{
        type: String,
        required: true,
        index: true, 
        unique: true
    },
    textQuestion:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    answerType:{
        type: String,
        enum: answerTypeTypes,
        required: true
    },
    correctAnswers:{
        type:[
            {
                type: String
            }
        ]
    },
    wrongAnswers:{
        type:[
            {
                type: String
            }
        ]
    }
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question