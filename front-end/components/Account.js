import React, { Component } from "react";
import "whatwg-fetch";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import { connect } from "react-redux";

class Lost extends Component {
  constructor(props) {
    super(props);
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
      email: "",
      notification: false,
      notificationText: "",
      notificationType: "",
      timer: null,
      table: false
    };
  }

  handleDismiss() {
    this.setState({
      notification: false
    });
    clearInterval(this.state.timer);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
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
    fetch("/api/items/" + this.state.email.toLowerCase() + "@virginia.edu")
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
          data: json,
          table: true
        });
        clearInterval(this.state.timer);

        let timer = setInterval(this.handleDismiss, 3000);
        this.setState({ timer });
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
        <div className="columns">
          <div className="column " />
          <div className="column is-one-third">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">
                  Please Enter your Computing ID:
                  <input
                    className="input"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={this.state.email}
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
        <br />
        {this.state.table ? (
          <div>
            <h2 className="subtitle">
              You have checked out the following Items:
            </h2>
            <ReactTable
              className="-striped -highlight table"
              data={data}
              columns={columns}
              defaultPageSize={10}
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              {...this.state.tableOptions}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Lost;
