import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";
import NavBar from "./NavBar";

import Footer from "./Footer";

class ContactDetailsCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h3>Reach us</h3>
          <label className="main-label" style={{ "font-size": "2rem" }}>
            ABC Bank
          </label>
          <br />
          <i className="fa  fa-map-marker fa-fw" />
          <label className="main-label">
            <p>25,Opc Street, Thiruperur, </p>
            <p>Chennai </p>
          </label>
          <br />
          <i className="fa fa-phone fa-fw" />
          <label className="main-label">044 - 1234567 , 568, 569</label>
          <br />
          <i className="fa fa-mobile fa-fw" />
          <label className="main-label">
            <p> +91 - 9988776655 </p>
            <p> +91 - 9988776644 </p>
          </label>
          <i className="fa fa-envelope fa-fw" />
          <label className="main-label">abcbank@abc.com</label>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactDetailsCom;
