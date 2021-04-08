import React from "react";
import "./style.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }
  render() {
    return (
      <footer>
        <div className="firstLevelFooter" />
        <div className="secondLevelFooter" />
      </footer>
    );
  }
}

export default Footer;
