import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <div className="hero-heading">
            <div className="section has-text-centered">
              <h1 className="title">Login</h1>
            </div>
          </div>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <label className="label">
                        Email:
                        <input
                          className="input"
                          name="email"
                          type="email"
                          checked={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </label>
                    </div>

                    <br />
                    <div className="field">
                      <label className="label">
                        Item:
                        <input
                          className="input"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                      </label>
                    </div>

                    <input
                      className="button is-primary"
                      type="submit"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
