"use strict";

const fs = require("fs");
const path = require("path");
const db = require("../database/db");

/**
 * Automatically seeds all files found in the seeds folder (an export of an async 'seed' function is expected)
 */
db.connectDB()
	.then(async function () {
		console.log("SEEDING DB...");

		//Reads file
		const seedFuncs = fs
			.readdirSync(__dirname, { withFileTypes: true })
			.filter(
				(file) =>
					file.isFile() &&
					file.name != path.basename(__filename) &&
					file.name != "seeds.email.js"
			)
			.map((f) => {
				const seedingFile = require("./" + f.name);
				if (seedingFile && seedingFile.seed) return seedingFile.seed();
				else return Promise.resolve();
			});

		return Promise.all(seedFuncs);
	})
	.then((_) => console.log("...SEEDING DONE :D"))
	.catch((err) => console.error("Seeding failed: " + err))
	.finally((_) => db.disconnectDB());
