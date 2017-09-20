import React, { Component } from "react";
import "whatwg-fetch";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";

class Items extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
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
      data: []
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
      </div>
    );
  }
}

export default Items;
