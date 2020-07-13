const { Question } = require('../database/models/models.index')

class QuestionStore{

    /**
     * 
     * @param {Question} question 
     */
    static async createQuestion(question){
        try {
            return question.save()
        } catch (error) {
            return error
        }
    }

    /**
     * 
     */
    static async getAllQuestions(){
        try {
            const questions = await Question.find().exec()
            return questions
        } catch (error) {
            return error
        }
    }

   /**
    * 
    * @param {String} questionId 
    * @param {JSON} question 
    */
    static async updateQuestion(questionId, question){
        try {
            const updated = await Question.findOneAndUpdate({questionId: questionId}, question)
            return updated
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param {String} questionId 
     */
    static async deleteQuestion(questionId){
        try {
            const deleted = await Question.deleteOne({questionId: questionId})
            return deleted
        } catch (error) {
            return error
        }
    }
}

module.exports = QuestionStore