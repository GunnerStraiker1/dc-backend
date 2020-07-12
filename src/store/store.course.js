const { Course, User } = require('../database/models/models.index')

class CourseStore {
    /**
     * @static
     * @param {Course} course 
     * @returns
     * @memberof CourseStore
     */
    static async createCourse(course) {
        try {
            return course.save();
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @static
     * @param {Array} approvedCourses 
     * @param {String} actualCourse 
     * @returns
     * @memberof CourseStore
     */
    static async findStudentCourses(approvedCourses = [], actualCourse) {
        try {
            approvedCourses.push(actualCourse)
            return Course.aggregate()
                .addFields(
                    {
                        "studentAccess":
                        {
                            $cond: [
                                { $in: ["$courseId", approvedCourses] },
                                true,
                                false
                            ]
                        }
                    }

                )
                .project({ lessons: 0 })
                .exec()
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param {String} courseId 
     * @param {Boolean} isActual 
     * @param {Number} actualLesson 
     */
    static async getStudentLessonsByCourse(courseId = String, isActual = Boolean, actualLesson) {

        try {
            if (isActual) {
                return Course.aggregate()
                    .match({ courseId: courseId })
                    .lookup({
                        from: 'lessons',
                        let: {lessons: "$lessons"},
                        pipeline:[

                            { $match: { $expr: { $in: ["$lessonId", "$$lessons"] }}},
                            { $addFields: {
                                "studentAccess":
                                {
                                    $cond: [
                                        { $lte: ["$lessonNumber", actualLesson] },
                                        true,
                                        false
                                    ]
                                }
                            }},
                            {$project: { lessonId: 1, name: 1, lessonNumber: 1, studentAccess: 1, previousLesson: 1 }}
                            // { $match: { $expr: { $and:[
                            //     {$in: ["$lessonId", "$$lessons"]},
                            //     {$lte: ["$lessonNumber", actualLesson]}
                            // ]  } } },
                        ],
                        // localField: "lessons",
                        // foreignField: "lessonId",
                        as: "lessons"
                    })
                    .project({ courseId: 1, name: 1, lessons: 1 })
                    .exec()
            } else {
                return Course.aggregate()
                    .match({ courseId: courseId })
                    .lookup({
                        from: 'lessons',
                        localField: "lessons",
                        foreignField: "lessonId",
                        as: "lessons"
                    })
                    .project({ courseId: 1, lessons: 1, name: 1 })
                    .exec()
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = CourseStore