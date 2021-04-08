import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./style.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user") != "") {
      this.setState({
        userName: localStorage.getItem("user")
      });
    } else {
      alert("Not Authorized to access thi page.!");
      location.href = window.location.origin;
    }
  }

  Click_Logout() {
    localStorage.setItem("user", "");

    localStorage.setItem("isLoggedin", 0);
    return;
  }

  render() {
    return (
      <div>
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
            <i
              className="fa fa-user fa-fw"
              style={{ color: "white", "padding-left": "30%" }}
            />
            <span style={{ color: "white" }}> Hi, {this.state.userName}</span>
            <Link onClick={this.Click_Logout} to="/">
              <span
                className="fa fa-sign-out"
                style={{
                  color: "white",
                  "padding-left": "1%",
                  cursor: "pointer"
                }}
              >
                <span style={{ color: "white" }}> Logout</span>
              </span>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
