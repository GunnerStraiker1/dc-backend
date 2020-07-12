"use strict";

const mongoose = require("mongoose");
require("dotenv").config();

const autoIncrement = require("mongoose-auto-increment");

/**
 * Connect to database, according to .env configuration
 *
 * @returns {Promise} Promise that resolves in mongoose connection
 */
const connectDB = () => {
	mongoose.set("useCreateIndex", true);
	let uri;

	if (process.env.DB_LOCATION == "remote") {
		uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
	} else if (process.env.DB_LOCATION == "local") {
		uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
	} else {
		return Promise.reject(`Cannot connect to DB: unknown location '${process.env.DB_LOCATION}'`);
	}

	console.log(`Connecting to ${process.env.DB_LOCATION} DB: ${uri}`);
	return mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
};

const setDBErrorTracker = () => {
	//Set mongoonse error event handler
	mongoose.connection.on("error", (err) => {
		global.dbConnectionUp = false;
	});
	//Set mongoonse disconnected event handler
	mongoose.connection.on("disconnected", (err) => {
		global.dbConnectionUp = false;
	});
	//Set mongoonse reconnected event handler
	mongoose.connection.on("reconnected", (err) => {
		global.dbConnectionUp = true;
	});
};

autoIncrement.initialize(mongoose.connection);

/**
 * Disconnect from DB
 *
 */
const disconnectDB = () => {
	console.log("Disconnecting from DB");
	mongoose.connection.close();
};

/**
 * Drop DB
 *
 */
const dropDB = async function () {
	if (!mongoose.connection.readyState == mongoose.STATES.connected) await connectDB();

	mongoose.connection.db
		.dropDatabase()
		.then((_) => console.log("Database droppped"))
		.then(disconnectDB)
		.catch((err) => console.error(err));
};

module.exports = {
	connectDB,
	disconnectDB,
	dropDB,
	setDBErrorTracker,
};
