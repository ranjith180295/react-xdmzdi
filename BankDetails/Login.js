import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";
import "font-awesome/css/font-awesome.min.css";

import Footer from "./Footer";

class LoginCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      logInClick: false,
      errors: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedin");
  }

  Reset() {
    location.reload();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
  }

  //Handle Form Submitting
  handleSubmit(event) {
    event.preventDefault();
    if (!this.validate()) return;
    debugger;
    const { username, password, returnUrl } = this.state;

    if (this.state.UserName == "Ranjith" && this.state.UserPassword == "123") {
      localStorage.setItem("user", this.state.UserName);

      localStorage.setItem("isLoggedin", 1);
      this.props.history.push("/Transaction");
    } else {
      alert("Invalid Credentials");
    }
  }

  validate() {
    let errors = {};
    let valid = true;
    if (!this.state.UserName) errors.UserName = "User Name is Required";
    if (!this.state.UserPassword) errors.UserPassword = "Password is Required";

    if (Object.getOwnPropertyNames(errors).length > 0) valid = false;
    this.setState({ errors });
    console.log(errors);
    return valid;
  }

  render() {
    const { username, password, logInClick, error } = this.state;
    let a =
      localStorage.getItem("isLoggedin") != 0
        ? "display:none"
        : "display:block";
    return (
      <div id="container" className="mainContainer">
        <div className="divMain">
          <nav className="menu">
            <div className="title">ABC Bank</div>
          </nav>
          <div>
            <h3>LogIn</h3>
            {/* <label
              className={
                this.state.errors.InvalidCredentials
                  ? "DisplayinvalidCredential"
                  : "NDisplayinvalidCredential"
              }
            /> */}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <fieldset
                className={
                  this.state.errors.UserName
                    ? "half-width right error"
                    : "half-width right"
                }
              >
                <label className="main-label">User Name</label>
                <i className="fa fa-user fa-fw" />
                <input
                  type="text"
                  name="UserName"
                  value={this.state.UserName}
                  onChange={this.handleChange} //onChange={this.handleChange.bind(this)}
                  className="inputLoginInput"
                  maxLength="15"
                  autocomplete="off"
                />
              </fieldset>
              <br />
              <fieldset
                className={
                  this.state.errors.UserPassword
                    ? "half-width right error"
                    : "half-width right"
                }
              >
                <label className="main-label">Password</label>
                <i className="fa fa-lock fa-fw" />
                <input
                  type="password"
                  name="UserPassword"
                  value={this.state.UserPassword}
                  onChange={this.handleChange} //onChange={this.handleChange.bind(this)}
                  className="inputLoginInput"
                  maxLength="10"
                />
              </fieldset>
              <fieldset className="button-holder">
                <input
                  type="submit"
                  className="button CTALoginButton"
                  value="Login"
                />
                <input
                  type="button"
                  className="button simpleButton"
                  value="Reset"
                  onClick={this.Reset}
                />
              </fieldset>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginCom;
