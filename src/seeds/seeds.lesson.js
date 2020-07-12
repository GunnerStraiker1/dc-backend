"use strict";

const Lesson = require('../database/models/models.lesson')
const mongoose = require('mongoose')

const mockLessons = [
    new Lesson({
        _id: mongoose.Types.ObjectId(),
        lessonId: "L1",
        name: "Math Basic 1",
        lessonNumber: 1,
        approvalScore: 15,
        previousLesson: "",
        questions:["Q1", "Q2", "Q3"]
    }),
    new Lesson({
        _id: mongoose.Types.ObjectId(),
        lessonId: "L2",
        name: "Math Basic 2",
        lessonNumber: 2,
        approvalScore: 15,
        previousLesson: "L1",
        questions:["Q4", "Q5", "Q6"]
    }),
    new Lesson({
        _id: mongoose.Types.ObjectId(),
        lessonId: "L3",
        name: "Math Advanced 1",
        lessonNumber: 1,
        approvalScore: 15,
        previousLesson: "",
        questions:["Q7", "Q8", "Q9"]
    }),
    new Lesson({
        _id: mongoose.Types.ObjectId(),
        lessonId: "L4",
        name: "Math Advanced 2",
        lessonNumber: 2,
        approvalScore: 15,
        previousLesson: "L3",
        questions:["Q10", "Q11", "Q12"]
    }),
    new Lesson({
        _id: mongoose.Types.ObjectId(),
        lessonId: "L5",
        name: "Math Advanced 3",
        lessonNumber: 3,
        approvalScore: 15,
        previousLesson: "L4",
        questions:["Q13", "Q14", "Q15"]
    }),
];

module.exports={
    mockLessons,
    async seed() {
		console.log(">Seeding Lessons");

		await Promise.all(mockLessons.map((x) => x.save())).catch((err) => {
			return Promise.reject("Error while seeding Lessons: " + err);
		});

		console.log(">...Lessons done");
	},
}