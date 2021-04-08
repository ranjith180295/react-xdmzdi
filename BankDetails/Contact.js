import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";
import NavBar from "./NavBar";

class ContactDetailsCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1> Hi User Ranjith, </h1>
        <p />
        <div />
      </div>
    );
  }
}

export default ContactDetailsCom;
