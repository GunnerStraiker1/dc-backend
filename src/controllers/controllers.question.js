const { ErrorTypes, ErrorHandler } = require('../helpers/errors');
const { handleSuccess, SuccessHandler, SuccessType } = require('../helpers/success');
const { Question } = require('../database/models/models.index')
const QuestionStore = require('../store/store.questions')

class QuestionController {

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     */
    static async createQuestion(req, res, next) {
        try {
            //Check if you have duplicated Courses
            const foundQuestion = await Question.findOne({ courseId: req.body.courseId }).exec()
            if (foundQuestion !== null)
                return next(new ErrorHandler(
                    ErrorTypes.DUPLICATED_VALUES,
                    "courseId"
                ))
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        //Insertion in DB
        let question = new Question(req.body)

        try {
            const questioninserted = await QuestionStore.createQuestion(question)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, questioninserted), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     */
    static async getAllQuestions(req, res, next) {
        try {
            const questions = await QuestionStore.getAllQuestions()
            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, questions), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     */
    static async updateQuestion(req, res, next){
        try {

            const questionId = req.params.questionId

            //Check if the course exist
            const exist = await Question.exists({questionId: questionId})
            if(!exist){
                return next(new ErrorHandler(ErrorTypes.INVALID_ID,"QuestionId", questionId))
            }
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        //Insertion in DB
        let questionChanges = req.body

        try {
            const questionUpdated = await QuestionStore.updateQuestion(questionId, questionChanges)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, questionUpdated), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     */
    static async deleteQuestion(req, res, next){
        try {

            const questionId = req.params.questionId

            //Check if the course exist
            const exist = await Question.exists({questionId: questionId})
            if(!exist){
                return next(new ErrorHandler(ErrorTypes.INVALID_ID,"QuestionId", questionId))
            }
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        try {
            const questionDelete = await QuestionStore.deleteQuestion(questionId)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, questionDelete), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }

}
module.exports = QuestionController