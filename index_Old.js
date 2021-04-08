import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import LoginCom from './LogIn/LogIn'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      //UserName :'',// this.props.UserName,
      isLoggedin : false
    };
    
    this.ValidateLogin = this.ValidateLogin.bind(this);
  }
  
ValidateLogin()
{
  alert("a");
  //this.setState({isLoggedIn : true});
  // this.state.isLoggedIn = true;
  // alert(this.state.isLoggedIn);
};

  render() {
    if(!this.isLoggedin)
    {
         return  <LoginCom ValidateLogin={this.ValidateLogin.bind(this)} />;
    }
    else
    {
    return (
      <div>     
        <Hello name={this.state.UserName} />      
        <p>
          Start editing to see some magic happen :)
        </p> 
        </div>      
    );
  }
}
}

render(<App />, document.getElementById('root'));
