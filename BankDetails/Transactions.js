import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";
import NavBar from "./NavBar";
import OutData from "./Transaction_out.json";

import Footer from "./Footer";
class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: []
    };
  }

  componentWillMount() {
    this.setState({ header: Object.getOwnPropertyNames(this.props.data[0]) });
  }

  renderHeader(columns) {
    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <td key={index}>{column}</td>;
          })}
        </tr>
      </thead>
    );
  }

  renderBody(rows, columns) {
    return (
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {columns.map((column, innerIndex) => {
                return <td key={innerIndex}>{row[column]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    if (this.state.header.length === 0) return false;
    return (
      <div className="transfer-activity-table">
        <table className="">
          {this.renderHeader(this.state.header)}
          {this.renderBody(this.props.data, this.state.header)}
        </table>
      </div>
    );
  }
}

class TransactionDetailsCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="transfer-activity profile">
          <h3>Transfer Activity</h3>
          <h4>Scheduled Transactions</h4>
          <SimpleTable data={OutData.OutData} />
          <h4>Processed Transfers</h4>
          <SimpleTable data={OutData.TransactionIn} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default TransactionDetailsCom;
