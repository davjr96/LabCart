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

import ProtectedComponent from "./Protected";
import LoginComponent from "./Login";
import Checkout from "./Checkout";
import Return from "./Return";

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent);
const Protected = userIsAuthenticatedRedir(ProtectedComponent);

const LoginLink = userIsNotAuthenticated(() => (
  <Link className="button is-large" to="/login">
    Login
  </Link>
));
const LogoutLink = userIsAuthenticated(({ logout }) => (
  <a href="#" className="button is-large" onClick={() => logout()}>
    Logout
  </a>
));

function App({ user, logout }) {
  return (
    <Router>
      <div>
        <div className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <Link className="button is-large" to="/">
                Checkout
              </Link>
            </a>
            <a className="navbar-item">
              <Link className="button is-large" to="/return">
                Return
              </Link>
            </a>
            <div className="navbar-end">
              <LoginLink />
              <LogoutLink logout={logout} />
            </div>
          </div>
        </div>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Checkout} />
        <Route path="/return" component={Return} />
        <Route path="/items" component={Protected} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(App);
