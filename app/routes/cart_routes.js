const pool = require("../../config/db");
var moment = require("moment");
module.exports = function(app) {
  app.get("/api/items", (req, res) => {
    pool.query("SELECT * FROM items;", function(err, dbres) {
      if (err) {
        return res.status(err.status || 500).json({
          status: "error",
          message: err.message
        });
      }
      res.send(dbres.rows);
    });
  });

  app.post("/api/checkout", (req, res) => {
    var item = req.body.item;
    var email = req.body.email;
    pool.query("SELECT * FROM items WHERE item_id = '" + item + "';", function(
      err,
      dbres
    ) {
      if (err) {
        return res.status(err.status || 500).json({
          status: "error",
          message: err.message
        });
      }
      if (dbres.rowCount == 0) {
        return res.status(500).json({
          status: "error",
          message: "Item Not Found"
        });
      }
      if (dbres.rows[0].out_to) {
        return res.status(500).json({
          status: "error",
          message: "Please Return this Item before Checking it out again!"
        });
      }
      pool.query(
        "UPDATE items SET out_to = '" +
          email +
          "', out_on = '" +
          moment().format() +
          "' WHERE item_id = '" +
          item +
          "';",
        function(err, dbres) {
          if (err) {
            return res.status(err.status || 500).json({
              status: "error",
              message: err.message
            });
          }
          return res.send({ status: "OK" });
        }
      );
    });
  });

  app.post("/api/checkin", (req, res) => {
    var item = req.body.item;
    pool.query("SELECT * FROM items WHERE item_id = '" + item + "';", function(
      err,
      dbres
    ) {
      if (err) {
        return res.status(err.status || 500).json({
          status: "error",
          message: err.message
        });
      }
      if (dbres.rowCount == 0) {
        return res.status(500).json({
          status: "error",
          message: "Item Not Found"
        });
      }
      if (!dbres.rows[0].out_to) {
        return res.status(500).json({
          status: "error",
          message: "This item has not been Checked Out!"
        });
      }
      pool.query(
        "UPDATE items SET out_to = NULL, out_on = NULL WHERE item_id = '" +
          item +
          "';",
        function(err, dbres) {
          if (err) {
            return res.status(err.status || 500).json({
              status: "error",
              message: err.message
            });
          }
          return res.send({ status: "OK" });
        }
      );
    });
  });

  app.post("/api/new", (req, res) => {
    var item = req.body.item;
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
          pool.query(
            "INSERT into items (item_id) VALUES ('" + item + "');",
            function(err1, dbres1) {
              if (err1) {
                return res.status(err1.status || 500).json({
                  status: "error",
                  message: err1.message
                });
              }
              return res.send({ status: "OK" });
            }
          );
        }
      }
    );
  });
};
