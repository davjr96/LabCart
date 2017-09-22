import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import styles from "./App.css";
import { logout } from "../actions/user";
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
  userIsAdminRedir,
  userIsAuthenticated,
  userIsNotAuthenticated
} from "../auth";

import AdminComponent from "./Admin";
import ProtectedComponent from "./Protected";
import LoginComponent from "./Login";
import Home from "./Home";
import Checkout from "./Checkout";
import Return from "./Return";
import Items from "./Items";

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent);
const Protected = userIsAuthenticatedRedir(ProtectedComponent);
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

const LoginLink = userIsNotAuthenticated(() => (
  <NavLink activeClassName={styles.active} to="/login">
    Login
  </NavLink>
));
const LogoutLink = userIsAuthenticated(({ logout }) => (
  <a href="#" onClick={() => logout()}>
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
              <a className="button is-large">
                <Link to="/checkout">Checkout</Link>
              </a>
            </a>
            <a className="navbar-item">
              <a className="button is-large">
                <Link to="/">Return</Link>
              </a>
            </a>
          </div>
          <div className="navbar-end">
            <LoginLink />
            <LogoutLink logout={logout} />
          </div>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Protected} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(App);
