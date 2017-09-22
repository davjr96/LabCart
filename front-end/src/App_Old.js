import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Return from "./Return";
import Items from "./Items";
import Login from "./Login";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item">
                <a className="button is-large">
                  <Link to="/">Checkout</Link>
                </a>
              </a>
              <a className="navbar-item">
                <a className="button is-large">
                  <Link to="/return">Return</Link>
                </a>
              </a>
            </div>
            <div className="navbar-end">
              <a>
                <Link to="/login">Login</Link>
              </a>
            </div>
          </div>
          <Route exact path="/" component={Checkout} />
          <Route exact path="/return" component={Return} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
export default App;
