const {Course, User, Lesson} = require('../database/models/models.index')

class UserStore{

    static async updateStudentLesson(lessonId, userId){
        try {
            let userInfo = await User.findOne({userId: userId}).exec()
            const courseInfo = await Course.findOne({lessons: lessonId}).exec()
            const lessonInfo = await Lesson.findOne({lessonId: lessonId}).exec()
            let updated = ""

            const courseId = courseInfo.courseId
            const lessons = courseInfo.lessons
            console.log(lessonInfo.lessonNumber)
            console.log(lessons.length)

            if(courseId === userInfo.actualCourse){
                if(lessonInfo.lessonNumber === userInfo.actualLesson){
                    if(lessonInfo.lessonNumber < lessons.length){
                        updated = await User.updateOne({userId: userId}, {$set : {"actualLesson" : userInfo.actualLesson + 1}})
                    }
                    else{
                        const courseInfo2 = await Course.findOne({previousCourse: courseId}).exec()
                        updated = await User.updateOne({userId: userId}, {$set : {"actualLesson" : 1, "actualCourse" : courseInfo2.courseId }})
                    }
                    return updated
                }
                else
                    return {message: "You have answered correctly!, but you have done it before"}
            }
            else
                return {message: "You have answered correctly!, but you have done it before"}

        } catch (error) {
            return error
        }
    }
}

module.exports = UserStore