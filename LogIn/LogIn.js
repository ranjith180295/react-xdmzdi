import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style";

class LoginCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      logInClick: false,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.ValidateLogin = this.ValidateLogin.bind(this);
  }

  ValidateLogin() {
    this.setState({ logInClick: true, error: "" });
    const { username, password, returnUrl } = this.state;

    if (!username || !password) {
      return;
    }

    if (username == "Ranjith" && password == "123") {
      localStorage.setItem("user", username);

      localStorage.setItem("isLoggedin", 1);
      debugger;
      this.props.history.push("/Home");
    } else {
      this.setState({ error: "Invalid Credentials" });
    }
    //this.setState({isLoggedIn : true});
    // this.state.isLoggedIn = true;
    // alert(this.state.isLoggedIn);
  }

  Reset() {
    location.reload();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
    //this.setState({value: event.target.value});
    //console.log(this);
  }

  render() {
    const { username, password, logInClick, error } = this.state;
    let a =
      localStorage.getItem("isLoggedin") != 0
        ? "display:none"
        : "display:block";
    return (
      <div className="divMain" style={{ a }}>
        <h2>Login</h2>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="username"
            type="text"
            id="txtLogInID"
            placeholder="Enter Name"
            value={this.state.username}
            onChange={this.handleChange}
          />
          {logInClick && !username && (
            <div className="ErrorClass">User Name is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="password"
            type="password"
            id="txtLogInPwd"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Enter Password"
          />
          {logInClick && !password && (
            <div className="ErrorClass">User Password is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <button className="Loginbutton" onClick={this.ValidateLogin}>
            LogIn
          </button>
          <button className="Loginbutton" onClick={this.Reset}>
            Reset
          </button>
        </div>
        {error && <div className="ErrorClass">{error} </div>}
      </div>
    );
  }
}

// class LogInFinalComp extends React.Component{
// render()
// {
//   return ( <LoginCom/>);
// };
// };

export default LoginCom;
