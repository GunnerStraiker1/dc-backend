"use strict";

const { role } = require("../helpers/enums");
const User = require('../database/models/models.user')
const mongoose = require('mongoose')

const mockUsers = [
    new User({
        _id: mongoose.Types.ObjectId(),
        userId: 12000860,
        name: "Victor Perera",
        email: "victor@email.com",
        password: "password1",
        roles: role.Student,
        approvedCourses: [],
        actualCourse: "C1",
        actualLesson: 1
    }),
    new User({
        _id: mongoose.Types.ObjectId(),
        userId: 12000861,
        name: "Raul Perera",
        email: "raul@email.com",
        password: "password2",
        roles: role.Student,
        approvedCourses: [],
        actualCourse: "C1",
        actualLesson: 2
    }),
    new User({
        _id: mongoose.Types.ObjectId(),
        userId: 12000862,
        name: "Israel Rodriguez",
        email: "israel@email.com",
        password: "password3",
        roles: role.Student,
        approvedCourses: ["C1"],
        actualCourse: "C2",
        actualLesson: 2
    }),
    new User({
        _id: mongoose.Types.ObjectId(),
        userId: 18000968,
        name: "Manuel Robertos",
        email: "professor@email.com",
        password: "12345",
        roles: role.Professor

    })
];

module.exports={
    mockUsers,
    async seed() {
		console.log(">Seeding Users");

		await Promise.all(mockUsers.map((x) => x.save())).catch((err) => {
			return Promise.reject("Error while seeding Users: " + err);
		});

		console.log(">...Users done");
	},
}