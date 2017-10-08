import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/user";
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
  userIsAdminRedir,
  userIsAuthenticated,
  userIsNotAuthenticated
} from "../auth";

import LoginComponent from "./Login";
import Checkout from "./Checkout";
import Return from "./Return";
import Items from "./Items";
import Account from "./Account";
import Add from "./Add";

const Login = userIsNotAuthenticatedRedir(LoginComponent);
const Protected = userIsAuthenticatedRedir(Items);

const LoginLink = userIsNotAuthenticated(() => (
  <Link className="button" to="/login">
    Admin
  </Link>
));
const LogoutLink = userIsAuthenticated(({ logout }) => (
  <a href="#" className="button" onClick={() => logout()}>
    Logout
  </a>
));
const InventoryLink = userIsAuthenticated(() => (
  <Link className="navbar-item button is-large" to="/items">
    Inventory
  </Link>
));

function App({ user, logout }) {
  return (
    <Router>
      <div className="Site">
        <div className="Site-content">
          <div className="columns">
            <Link className="column is-quarter button is-info is-large" to="/">
              Checkout
            </Link>
            <Link
              className=" column is-quarter button is-primary is-large"
              to="/return"
            >
              Return
            </Link>
            <Link
              className="column is-quarter button is-info is-large"
              to="/add"
            >
              New Item
            </Link>
            <Link
              className=" column is-quarter button is-primary is-large"
              to="/account"
            >
              My Account
            </Link>
          </div>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Checkout} />
          <Route path="/return" component={Return} />
          <Route path="/items" component={Protected} />
          <Route path="/account" component={Account} />
          <Route path="/add" component={Add} />
        </div>
        <footer>
          <div className="navbar-end">
            <LoginLink />
            <LogoutLink logout={logout} />
          </div>
        </footer>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(App);
