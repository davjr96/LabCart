const pool = require("../../config/db");
var moment = require("moment");

module.exports = function(app) {
  //Return all items and their status
  //This is only accessible by an admin, the credentials must be included in the post request
  app.post("/api/items", (req, res) => {
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
          pool.query("SELECT * FROM items;", function(err1, dbres1) {
            if (err1) {
              return res.status(err1.status || 500).json({
                status: "error",
                message: err1.message
              });
            }
            res.send(dbres1.rows);
          });
        }
      }
    );
  });
  //Return an item
  app.get("/api/items/:email", (req, res) => {
    var email = req.params.email;
    pool.query("SELECT * FROM items WHERE out_to = '" + email + "';", function(
      err,
      dbres
    ) {
      if (err) {
        return res.status(err.status || 500).json({
          status: "error",
          message: err.message
        });
      }
      res.send(dbres.rows);
    });
  });

  //Checkout an item
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
          return res.status(200).send({ status: "OK", message: item });
        }
      );
    });
  });
  //Return an item
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
          return res.status(200).send({ status: "OK", message: item });
        }
      );
    });
  });

  //Add a new item
  app.post("/api/new", (req, res) => {
    var item = req.body.item;

    pool.query("INSERT into items (item_id) VALUES ('" + item + "');", function(
      err1,
      dbres1
    ) {
      if (err1) {
        return res.status(err1.status || 500).json({
          status: "error",
          message: err1.message
        });
      }
      return res.status(200).send({ status: "OK", message: item });
    });
  });
};
