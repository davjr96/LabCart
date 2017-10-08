import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { login } from "../actions/user";

export class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  onClick = e => {
    e.preventDefault();
    this.props.login({
      user: this.refs.email.value.toLowerCase(),
      pass: this.refs.password.value
    });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Login</h1>
          <div className="columns">
            <div className="column " />
            <div className="column is-one-third">
              <div className="field">
                <label className="label">
                  Email:
                  <input
                    className="input"
                    name="email"
                    type="email"
                    ref="email"
                  />
                </label>
              </div>
              <br />
              <div className="field">
                <label className="label">
                  Password:
                  <input
                    className="input"
                    name="item"
                    type="password"
                    ref="password"
                  />
                </label>
              </div>
              <button className="button is-primary" onClick={this.onClick}>
                Login
              </button>
            </div>
            <div className="column" />
          </div>
        </div>
      </section>
    );
  }
}
export default connect(null, { login })(LoginContainer);
