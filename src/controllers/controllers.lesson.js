const { ErrorTypes, ErrorHandler } = require('../helpers/errors');
const { handleSuccess, SuccessHandler, SuccessType } = require('../helpers/success');
const LessonStore = require('../store/store.lesson')
const UserStore = require('../store/store.user')
const { answerType } = require('../helpers/enums')
const { Lesson, Course } = require('../database/models/models.index')

/**
     * 
     * @param {Array} questionsinformation 
     * @param {Array} answers 
     */
    function verifyAnswers(questionsinformation = [], answers) {
        let score = 0
        questionsinformation.map((question) => {
            let questionScore = question.score
            let correctAnswers = question.correctAnswers
            let type = question.answerType

            answers.map((ans) => {
                switch (type) {
                    case answerType.Bool:
                        if(correctAnswers.includes(ans)){
                            score += questionScore
                        }
                        break;
                    case answerType.OneAnswer:
                        if(correctAnswers.includes(ans)){
                            score += questionScore
                        }
                        break;

                    case answerType.MoreOneAnswer:
                        const found = correctAnswers.some(cAns => ans.includes(cAns))
                        if(found){
                            score += questionScore
                        }
                        break;
                    case answerType.AllAnswers:
                        if(JSON.stringify(correctAnswers) == JSON.stringify(ans)){
                            score += questionScore
                        }
                        break;
                }
            })
        })
        return score
    }

class LessonController {

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     */
    static async createLesson(req, res, next) {
        try {
            //Check if you have duplicated Courses
            const exist = await Lesson.exists({ lessonId: req.body.lessonId })
            if (exist)
                return next(new ErrorHandler(
                    ErrorTypes.DUPLICATED_VALUES,
                    "lessonId"
                ))
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        //Insertion in DB
        let lesson = new Lesson(req.body)

        try {
            const lessonInserted = await LessonStore.createLesson(lesson)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, lessonInserted), res);
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
    static async getLessonDetails(req, res, next) {

        try {
            const lessonId = req.params.lessonId

            //Check if the lesson exist
            const exist = await Lesson.exists({ lessonId: lessonId })
            if (!exist) {
                return next(new ErrorHandler(ErrorTypes.INVALID_ID, "lessonId", lessonId))
            }
            const lessonInformation = await LessonStore.getLessonDetails(lessonId)
            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, lessonInformation), res);

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
    static async takeLesson(req, res, next) {

        try {
            const userId = req.user.userId
            const lessonId = req.params.lessonId
            const answers = req.body
            let returnMessage = ""

            //Check if the lesson exist
            const exist = await Lesson.exists({ lessonId: lessonId })
            if (!exist) {
                return next(new ErrorHandler(ErrorTypes.INVALID_ID, "lessonId", lessonId))
            }

            let arrayAnswers = Object.values(answers)

            const lessonInformation = await LessonStore.getLessonDetails(lessonId)
            let lessonScore = lessonInformation[0].approvalScore
            let lessonQuestions = lessonInformation[0].questions

            if(lessonQuestions.length !== arrayAnswers.length){
                return next(new ErrorHandler(ErrorTypes.CUSTOM_ERROR, "You have sending more answers than questions"))
            }

            const totalScore = verifyAnswers(lessonQuestions, arrayAnswers)
            
            if (lessonScore === totalScore) {
                const updateStudentLesson = await UserStore.updateStudentLesson(lessonId, userId)
                returnMessage = {message: "You have reached the approval score, now you can start a new Lesson", score: totalScore, update: updateStudentLesson}

            }
            else{
                returnMessage = {message: "You have not reached the approval score", score: totalScore}
            }
            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, returnMessage), res);
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
    static async getAllLessons(req, res, next) {
        try {
            const lessons = await LessonStore.getAllLessons()
            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, lessons), res);
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
    static async updateLesson(req, res, next){
        try {

            const lessonId = req.params.lessonId

            //Check if the course exist
            const exist = await Lesson.exists({lessonId: lessonId})
            if(!exist){
                return next(new ErrorHandler(ErrorTypes.INVALID_ID,"LessonId", lessonId))
            }
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        //Insertion in DB
        let lessonChanges = req.body

        try {
            const lessonUpdated = await LessonStore.updateLesson(lessonId, lessonChanges)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, lessonUpdated), res);
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
    static async deleteLesson(req, res, next){
        try {

            const lessonId = req.params.lessonId

            //Check if the course exist
            const exist = await Lesson.exists({lessonId: lessonId})
            if(!exist){
                return next(new ErrorHandler(ErrorTypes.INVALID_ID,"lessonId", lessonId))
            }
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        try {
            const lessonDelete = await LessonStore.deleteLesson(lessonId)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, lessonDelete), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }

}
module.exports = LessonController