const mongoose = require("mongoose")

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: "object"
 *       required: [type, name, numberCourse, professor, lessons]
 *       properties:
 *         courseId:
 *           type: String
 *           example: "A113"
 *         name:
 *           type: String
 *           example: "Geometria"
 *         numberCourse:
 *           type: Number
 *           example: "1"
 *         previousCourse:
 *           type: string
 *           example: "B114"
 *         professor:
 *           type: Number
 *           example: "18000968"
 *         lessons:
 *           type: array
 *           items:
 *             type: String
 *           example: ["L15"]
 */
const courseSchema = mongoose.Schema({
    courseId:{
        type: String,
        required: true,
        index: true, 
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    numberCourse:{
        type: Number,
        required: true
    },
    previousCourse:{
        type: String,
    },
    professor:{
        type: Number,
        required: true
    },
    lessons:{
        type:[
            {
                type: String
            }
        ],
        required: true
    }
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course