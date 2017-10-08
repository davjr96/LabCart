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
    this.handleDismiss = this.handleDismiss.bind(this);

    this.delete = this.delete.bind(this);
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
      notification: false,
      notificationText: "",
      notificationType: "",
      timer: null
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
  delete(e, row) {
    var details = {
      item: row.value,
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

    fetch("/api/delete", {
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
        if (json.status === "OK") {
          this.setState({
            notification: true,
            notificationText: "Success! You have deleted " + json.message,
            notificationType: "notification is-success"
          });
        } else {
          this.setState({
            notification: true,
            notificationText: json.message,
            notificationType: "notification is-danger"
          });
        }
        this.loadData();

        clearInterval(this.state.timer);

        let timer = setInterval(this.handleDismiss, 3000);
        this.setState({ timer });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
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
      },
      {
        Header: "Delete",
        accessor: "item_id",
        Cell: row => (
          <button
            onClick={e => this.delete(e, row)}
            className="button is-danger is-fullwidth"
          >
            DELETE
          </button>
        ),
        filterable: false
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

        <br />
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
    );
  }
}

export default connect(state => ({ authData: state.user.data }))(Items);
