const { ErrorTypes, ErrorHandler } = require('../helpers/errors');
const { handleSuccess, SuccessHandler, SuccessType } = require('../helpers/success');
const CourseStore = require('../store/store.course')
const { User, Course } = require('../database/models/models.index')

class CourseController {

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response.} res 
     * @param {Function} next 
     */
    static async createCourse(req, res, next) {

        try {
            //Check if you have duplicated Courses
            const foundCourse = await Course.findOne({ courseId: req.body.courseId }).exec()
            if (foundCourse !== null)
                return next(new ErrorHandler(
                    ErrorTypes.DUPLICATED_VALUES,
                    "courseId"
                ))
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

        //Insertion in DB
        let course = new Course(req.body)

        try {
            const courseInserted = await CourseStore.createCourse(course)
            return handleSuccess(new SuccessHandler(SuccessType.CREATION, courseInserted), res);
        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response.} res 
     * @param {Function} next 
     */
    static async getStudentCourses(req, res, next){

        try {
            const student = await User.findOne({ userId: req.user.userId }).exec()
            const approvedCourses = student.approvedCourses
            const actualCourse = student.actualCourse
            
            let studentCourses = await CourseStore.findStudentCourses(approvedCourses, actualCourse)

            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, studentCourses), res);

        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }

    }


    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response.} res 
     * @param {Function} next 
     */
    static async getStudentLessonsByCourse(req, res, next){
        try {

            const courseId = req.params.courseId

            //Check if the course exist
            const exist = await Course.exists({courseId: courseId})
            if(!exist){
                return next(new ErrorHandler(ErrorTypes.INVALID_ID,"CourseId", courseId))
            }

            //Check if is the actual student course
            const student = await User.findOne({ userId: req.user.userId }).exec()
            let courseInformation = ""

            if(student.actualCourse === courseId){
                courseInformation = await CourseStore.getStudentLessonsByCourse(courseId, true, student.actualLesson)
            }
            else{
                if (student.approvedCourses.includes(courseId)) {
                    courseInformation = await CourseStore.getStudentLessonsByCourse(courseId, false)
                }
                else{
                    return next(new ErrorHandler(ErrorTypes.CUSTOM_ERROR, "You can't access to this course yet" ))
                }
            }

            return handleSuccess(new SuccessHandler(SuccessType.GENERAL_SUCCESS, courseInformation), res);

        } catch (error) {
            return next(new ErrorHandler(ErrorTypes.DATABASE_ERROR, error));
        }
    }
    
}

module.exports = CourseController