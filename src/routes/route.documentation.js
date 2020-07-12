const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("../helpers/swagger.setup");

const router = express.Router();

router.use("/docs", swaggerUi.serve);

router.get("/docs", swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
