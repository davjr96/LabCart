const cartRoutes = require("./cart_routes");
const authRoutes = require("./auth_routes");

module.exports = function(app, db) {
  cartRoutes(app, db);
  authRoutes(app, db);
};
