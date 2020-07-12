const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const autoIncrement = require("mongoose-auto-increment");
const { roleTypes } = require("../../helpers/enums");

const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: "object"
 *       required: [userId, name, email, password, roles]
 *       properties:
 *         userId:
 *           type: Number
 *           example: 12000860
 *         name:
 *           type: String
 *           example: "Victor Perera"
 *         email:
 *           type: String
 *           example: "prueba@email.com"
 *         password:
 *           type: String
 *           example: "12345"
 *         roles:
 *           type: String
 *           enums:
 *             -"Student"
 *             -"Professor"
 *           example: "Student"
 *         actualCourse:
 *           type: String
 *           example: "A113"
 *         actualLesson:
 *           type: Number
 *           example: "2"
 */
const userSchema = mongoose.Schema({
    userId:{
        type: Number,
        required: true,
        unique: true,
        index: true
	},
	name:{
		type: String,
		required: true
	},
    email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
    },
    roles: {
		type: [String],
		enum: roleTypes,
		required: true,
	},
	approvedCourses:{
		type: [
			{
				type: String
			}
		]
	},
    actualCourse: {
        type: String, 
        ref: "Course"
    },
    actualLesson:{
        type: Number,
    }
})




//Hash password before saving
userSchema.pre("save", function (done) {
	const user = this;
	if (!user.isModified("password")) return done();

	bcrypt
		.hash(user.password, SALT_FACTOR)
		.then((hash) => {
			user.password = hash;
			done();
		})
		.catch((err) => {
			console.error(err);
			return done(err);
		});
});

//
/**
 * Auto increments user id
 */
userSchema.plugin(autoIncrement.plugin, { model: "User", field: "userId", startAt: 100, incrementBy: 1 });

userSchema.plugin(mongoosePaginate);

//
/**
 * Checks that the provided user password is in fact, correct
 *
 * @param {String} guess - Provided password to compare with model
 * @returns {Boolean} Result of comparison
 */
userSchema.methods.checkPassword = function (guess) {
	return bcrypt.compare(guess, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;