const mongoose = require("mongoose")

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: "object"
 *       required: [lessonId, name, lessonNumber, approvalScore, questions]
 *       properties:
 *         lessonId:
 *           type: String
 *           example: "L15"
 *         lessonNumber:
 *           type: Number
 *           example: 2
 *         approvalScore:
 *           type: Number
 *           example: 80
 *         previousLesson:
 *           type: string
 *           example: "L14"
 *         questions:
 *           type: array
 *           items:
 *             type: String
 *           example: ["Q1"]
 */
const lessonSchema = mongoose.Schema({
    lessonId:{
        type: String,
        required: true,
        index: true, 
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    lessonNumber:{
        type: Number,
        required: true
    },
    approvalScore:{
        type: Number,
        required: true
    },
    previousLesson:{
        type: String
    },
    questions:{
        type:[
            {
                type: String
            }
        ],
        required: true
    }
})

const Lesson = mongoose.model("Lesson", lessonSchema)

module.exports = Lesson