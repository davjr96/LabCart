import React, { Component } from "react";
import "whatwg-fetch";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";

class Items extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      item: ""
    };
  }

  loadData() {
    fetch("/api/items")
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
      item: this.state.item
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
        this.loadData();
      })
      .catch(function(err) {
        console.log(err);
      });
    event.preventDefault();
  }
  render() {
    const data = this.state.data;
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

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">
              Item:
              <input
                className="input"
                name="item"
                type="text"
                value={this.state.item}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <input className="button is-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Items;
