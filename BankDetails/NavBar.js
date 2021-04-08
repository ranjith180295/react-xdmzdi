import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="btnMenu">
          <label htmlFor="chkMenu">
            <i className="fa fa-bars" />
          </label>
        </div>
        <input type="checkbox" id="chkMenu" />
        <nav className="menu">
          <div className="title">ABC Bank</div>
          <ul>
            <li>
              <Link htmlFor="chkMenu" to="/Transfer">
                Transfer
              </Link>
            </li>
            <li>
              <Link htmlFor="chkMenu" to="/Transaction">
                Transactions
              </Link>
            </li>
            <li>
              <Link htmlFor="chkMenu" to="/Contact">
                Contact
              </Link>
            </li>
            <i className="fa fa-user fa-fw" style={{ color: "white" }}>
              Hi, Ranjith
            </i>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
