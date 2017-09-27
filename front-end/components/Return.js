import React, { Component } from "react";

class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      notification: false,
      notificationText: "",
      notificationType: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }
  handleDismiss() {
    this.setState({
      notification: false
    });
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
    var details = {
      item: this.state.item
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/api/checkin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        this.setState({
          item: ""
        });
        if (json.status === "OK") {
          this.setState({
            notification: true,
            notificationText: "Success!",
            notificationType: "notification is-success"
          });
        } else {
          this.setState({
            notification: true,
            notificationText: json.message,
            notificationType: "notification is-danger"
          });
        }
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
    event.preventDefault();
  }
  render() {
    const message = this.state.notificationText;
    const type = this.state.notificationType;
    return (
      <section className="section">
        {this.state.notification ? (
          <div className={type}>
            <button className="delete" onClick={this.handleDismiss} />
            {message}
          </div>
        ) : null}
        <div className="container">
          <h1 className="title">Return</h1>
          <div className="columns">
            <div className="column " />
            <div className="column is-one-third">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">
                    Item:
                    <input
                      className="input"
                      name="item"
                      type="text"
                      autoComplete="off"
                      autoFocus="on"
                      value={this.state.item}
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
            <div className="column" />
          </div>
        </div>
      </section>
    );
  }
}

export default Return;
