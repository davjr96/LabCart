const pool = require("../../config/db");
var moment = require("moment");

module.exports = function(app) {
  app.get("/api/items", (req, res) => {
    pool.query("SELECT * FROM items;", function(err, dbres) {
      if (err) {
        return console.error("error running query", err);
      }
      res.send(dbres.rows);
    });
  });

  app.post("/api/checkout", (req, res) => {
    var item = req.body.item;
    var email = req.body.email;
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
          return console.error("error running query", err);
        }
        return res.send({ status: "OK" });
      }
    );
  });

  app.post("/api/checkin", (req, res) => {
    var item = req.body.item;
    pool.query(
      "UPDATE items SET out_to = NULL, out_on = NULL WHERE item_id = '" +
        item +
        "';",
      function(err, dbres) {
        if (err) {
          return console.error("error running query", err);
        }
        return res.send({ status: "OK" });
      }
    );
  });
};
