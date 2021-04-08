import React from "react";
import { render } from "react-dom";
import LstData from "../AddEdit/List";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
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
      this.props.history.push("/");
    }
  }

  Click_Logout() {
    localStorage.setItem("user", "");

    localStorage.setItem("isLoggedin", 0);

    debugger;
    //this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <h1> Hi User {this.state.userName}, </h1>

        <p>
          <Link onClick={this.Click_Logout} to="/">
            Logout
          </Link>
        </p>

        <div>
          <LstData />
        </div>
      </div>
    );
  }
}

export default Home;
