const cartRoutes = require("./cart_routes");

module.exports = function(app, db) {
  cartRoutes(app, db);
};
