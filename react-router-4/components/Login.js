import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import styles from "./App.css";
import { login } from "../actions/user";

export class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  onClick = e => {
    e.preventDefault();
    this.props.login({
      name: this.refs.name.value
    });
  };

  render() {
    return (
      <div className={styles.login}>
        <div>
          <input
            className={styles.username}
            type="text"
            ref="name"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <button className={styles.button} onClick={this.onClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
export default connect(null, { login })(LoginContainer);
