//Global packages
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const {
	ErrorHandler,
	handleError,
	ErrorTypes,
} = require("./src/helpers/errors");
const db = require("./src/database/db");

const indexRouter = require("./src/routes/route.index");

const app = express();

const port = process.env.PORT || 8888;

global.dbConnectionUp = false;
//General middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Route to handle request from all the routes in index
app.use("/api/v1", indexRouter);

//404 error handler
app.all("*", (req, res, next) => {
	next(new ErrorHandler(ErrorTypes.INVALID_ROUTE, req.originalUrl));
});


app.use((err, req, res, next) => {
	handleError(err, res);
});

app.listen(port, async (_) => {
	console.log("Server is up");
	try {
		await db.connectDB();
		db.setDBErrorTracker();
		global.dbConnectionUp = true;
	} catch (error) {
		global.dbConnectionUp = false;
	}
});