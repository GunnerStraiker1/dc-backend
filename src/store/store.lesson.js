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
     */
    static async getAllLessons(){
        try {
            const lessons = await Lesson.find().exec()
            return lessons
        } catch (error) {
            return error
        }
    }

   /**
    * 
    * @param {String} lessonId 
    * @param {JSON} lesson 
    */
    static async updateLesson(lessonId, lesson){
        try {
            const updated = await Lesson.findOneAndUpdate({lessonId: lessonId}, lesson)
            return updated
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param {String} lessonId 
     */
    static async deleteLesson(lessonId){
        try {
            const deleted = await Lesson.deleteOne({lessonId: lessonId})
            return deleted
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