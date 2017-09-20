import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Return from "./Return";
import Items from "./Items";

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
            <div className="navbar-brand" />
            <div className="nav-center">
              <a className="navbar-item">
                <a className="button is-large">
                  {" "}<Link to="/">Checkout</Link>
                </a>
              </a>
              <a className="navbar-item">
                <a className="button is-large">
                  {" "}<Link to="/return">Return</Link>
                </a>
              </a>
              <a className="navbar-item">
                <a className="button is-large">
                  {" "}<Link to="/items">Items</Link>
                </a>
              </a>
            </div>
          </div>
          <Route exact path="/" component={Checkout} />
          <Route exact path="/return" component={Return} />
          <Route exact path="/items" component={Items} />
        </div>
      </Router>
    );
  }
}
export default App;
