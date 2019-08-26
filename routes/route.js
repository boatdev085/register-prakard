const express = require("express");
const models = express.Router();
models.use("/start", require("../controller/register-prakard"));

module.exports = models;
