const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const { startRegister } = require("./controller/function-register-prakard");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
startRegister(__dirname);
const port = process.env.PORT || 2563;
app.listen(port);

console.log("App is listening on port " + port);
