const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const app = express();
const port = 3000;

//Middleware for processing post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes")(app);
app.listen(port, () => {
  console.log("We are live on " + port);
});
