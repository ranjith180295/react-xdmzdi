import React, { Component } from "react";
import { render } from "react-dom";
import LoginCom from "./LogIn/LogIn";
import Home from "./Home/Home";
import MaterialTestCom from "./MaterialTesting/MaterialTest";
import MaterialDesignCom from "./MaterialTesting/MaterialDesign";

import ContactDetailsCom from "./BankDetails/Contact";

import TransactionDetailsCom from "./BankDetails/Transactions";

import TransferCom from "./BankDetails/Transfer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/Home" exact component={Home} />
            <Route path="/MaterialTesting" exact component={MaterialTestCom} />
            <Route path="/MaterialDesign" exact component={MaterialDesignCom} />
            <Route path="/" exact component={LoginCom} />
            <Route path="/Contact" exact component={ContactDetailsCom} />
            <Route path="/Transfer" exact component={TransferCom} />
            <Route
              path="/Transaction"
              exact
              component={TransactionDetailsCom}
            />
          </div>
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
