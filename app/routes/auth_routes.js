const pool = require("../../config/db");
var moment = require("moment");

//Login route. Will check to see if a user is in the DB and will return accordingly
module.exports = function(app) {
  app.post("/api/login", (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;
    pool.query(
      "SELECT * FROM users WHERE users.user='" +
        user +
        "' AND users.pass='" +
        pass +
        "';",
      function(err, dbres) {
        if (err) {
          return res.status(err.status || 500).json({
            status: "error",
            message: err.message
          });
        }
        if (dbres.rows.length == 0) {
          return res.status(401).json({
            status: "Unauthorized",
            message: "User Not Found"
          });
        } else {
          return res.send({ status: "OK" });
        }
      }
    );
  });
};
