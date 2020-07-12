/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [Professor, Student]
 *       description: Role the user has inside the system
 * */
const role = {
	Professor: "Professor",
	Student: "Student"
};

/**
 * @swagger
 * components:
 *   schemas:
 *     AnswerType:
 *       type: string
 *       enum: [Bool, OneAnswer, MoreOneAnswer, AllAnswers]
 *       description: Question's answer type 
 * */
const answerType = {
	Bool: "Boolean",
	OneAnswer: "OneAnswer",
	MoreOneAnswer: "MoreOneAnswer",
	AllAnswers: "AllAnswer"
};



const roleTypes = Object.values(role);
const answerTypeTypes = Object.values(answerType);


module.exports = {
	role,
	roleTypes,
	answerType,
	answerTypeTypes
}