const cartRoutes = require("./cart_routes");
const authRoutes = require("./auth_routes");

module.exports = function(app, db) {
  cartRoutes(app, db); //Routes for user function
  authRoutes(app, db); //Routes for authentication
};
