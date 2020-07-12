"use strict";

const Course = require('../database/models/models.course')
const mongoose = require('mongoose')

const mockCourse = [
    new Course({
        _id: mongoose.Types.ObjectId(),
        courseId: "C1",
        name: "Math Basics",
        numberCourse: 1,
        previousCourse: "",
        professor: 18000968,
        lessons: ["L1", "L2"]
    }),
    new Course({
        _id: mongoose.Types.ObjectId(),
        courseId: "C2",
        name: "Math Advanced",
        numberCourse: 2,
        previousCourse: "C1",
        professor: 18000968,
        lessons: ["L3", "L4", "L5"]
    })
];

module.exports={
    mockCourse,
    async seed() {
		console.log(">Seeding Courses");

		await Promise.all(mockCourse.map((x) => x.save())).catch((err) => {
			return Promise.reject("Error while seeding Courses: " + err);
		});

		console.log(">...Courses done");
	},
}