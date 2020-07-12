const {Lesson, Question} = require('../database/models/models.index')


class LessonStore{

    /**
     * 
     * @param {Lesson} lesson 
     */
    static async createLesson(lesson){
        try {
            return lesson.save()
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param {String} lessonId 
     */
    static async getLessonDetails(lessonId = String){
        try {
            return Lesson.aggregate()
            .match({lessonId : lessonId})
            .lookup({
                from: "questions",
                localField: "questions",
                foreignField: "questionId",
                as: "questions"
            })
            .exec()
        } catch (error) {
            return error
        }
    }
}

module.exports = LessonStore