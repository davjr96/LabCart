import React, { Component } from "react";
import "whatwg-fetch";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import { connect } from "react-redux";

class Items extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);

    this.state = {
      tableOptions: {
        loading: true,
        showPagination: true,
        showPageSizeOptions: true,
        showPageJump: true,
        collapseOnSortingChange: true,
        collapseOnPageChange: true,
        collapseOnDataChange: true,
        freezeWhenExpanded: false,
        filterable: true,
        sortable: true,
        resizable: true
      },
      data: [],
      item: "",
      notification: false,
      notificationText: "",
      notificationType: ""
    };
  }

  handleDismiss() {
    this.setState({
      notification: false
    });
  }

  loadData() {
    var details = {
      user: this.props.authData.user,
      pass: this.props.authData.pass
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("/api/items", {
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
          tableOptions: {
            loading: false,
            showPagination: true,
            showPageSizeOptions: true,
            showPageJump: true,
            collapseOnSortingChange: true,
            collapseOnPageChange: true,
            collapseOnDataChange: true,
            freezeWhenExpanded: false,
            filterable: true,
            sortable: true,
            resizable: true
          },
          data: json
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
  componentDidMount() {
    this.loadData();
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
      item: this.state.item,
      user: this.props.authData.user,
      pass: this.props.authData.pass
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/api/new", {
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
        this.loadData();
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
    const data = this.state.data;
    const message = this.state.notificationText;
    const type = this.state.notificationType;

    const columns = [
      {
        Header: "Item",
        accessor: "item_id",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["item_id"] }),
        filterAll: true
      },
      {
        Header: "Out To",
        accessor: "out_to",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["out_to"] }),
        filterAll: true
      },
      {
        Header: "Out On",
        accessor: "out_on",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["out_on"] }),
        filterAll: true
      }
    ];

    return (
      <div>
        {this.state.notification ? (
          <div className={type}>
            <button className="delete" onClick={this.handleDismiss} />
            {message}
          </div>
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">
              Item:
              <input
                className="input"
                name="item"
                type="text"
                autoComplete="off"
                value={this.state.item}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <input className="button is-primary" type="submit" value="Submit" />
        </form>

        <br />
        <ReactTable
          className="-striped -highlight"
          data={data}
          columns={columns}
          defaultPageSize={10}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          {...this.state.tableOptions}
        />
      </div>
    );
  }
}

export default connect(state => ({ authData: state.user.data }))(Items);
