const swaggerJsdoc = require("swagger-jsdoc");

// Swagger set up
const options = {
	swaggerDefinition: {
		openapi: "3.0.2",
		info: {
			title: "DaCodes Backend Test",
			version: "1.0.0",
			description: "Endpoint documentation",
			license: {
				name: "MIT",
				url: "https://choosealicense.com/licenses/mit/",
			},
		},
		basePath: "src",
		servers: [
			{
				url: "http://localhost:5000/api/v1",
			},
		],
	},
	apis: [
		`${process.cwd()}/app.js`,
		`${process.cwd()}/src/helpers/enums.js`,
		`${process.cwd()}/src/database/models/*.js`,
		`${process.cwd()}/src/routes/*.js`,
	],
};
const specs = swaggerJsdoc(options);

module.exports = specs;
