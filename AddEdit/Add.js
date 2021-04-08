import React from "react";
import "./style";
import data from "../Data/data.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      UserID: "",
      FirstName: "",
      LastName: "",
      EmailID: "",
      MobileNo: "",
      Address: "",
      PinCode: "",
      SaveClick: false
    };

    this.state = this.initialState;
    if (this.props.user) {
      this.setState({ UserID: this.props.user });
    }

    this.handleChange = this.handleChange.bind(this);
    this.Reset = this.Reset.bind(this);
    this.WriteFileData = this.WriteFileData.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      const FilteredData = data.UsersData.filter(data => {
        if (data.UserId == this.props.user) return data;
      });
      FilteredData.map(data => {
        this.setState({
          UserID: data.UserId,
          FirstName: data.FirstName,
          LastName: data.LastName,
          EmailID: data.EmailID,
          MobileNo: data.MobileNo,
          Address: data.Address,
          PinCode: data.PinCode
        });
      });
    }
  }

  saveUserData() {
    var fs = require("fs");
    var object = JSON.parse(fs.readFileSync("./jsonFile.JSON", "utf8"));
    console.log(object.first[0].price);

    //Deleting
    delete object.first[0].price;

    //Adding a new object
    object.first = [this.state];

    //Writing results to JSON file
    fs.writeFileSync("../Data/data.json", JSON.stringify(object));
  }

  WriteFileData() {
    debugger;
    var obj = {
      UsersData: []
    };

    obj.UsersData.push(this.state);
    var json = JSON.stringify(obj);

    var fs = require("fs");
    debugger;
    fs.writeFile("../Data/data.json", json, "utf8", function(error) {
      debugger;
      if (error) {
        console.log("[write auth]: " + error);
      } else {
        console.log("[write auth]: success");
      }
    });
  }

  Reset() {
    if (this.state.UserID) {
      location.reload();
    } else {
      this.setState({
        FirstName: "",
        LastName: "",
        EmailID: "",
        MobileNo: "",
        Address: "",
        PinCode: "",
        SaveClick: false
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
  }

  render() {
    let pageTitle;
    let actionStatus;
    let ResetClear;
    if (this.state.UserID) {
      pageTitle = <h2>Edit User</h2>;
      actionStatus = <b>Update</b>;
    } else {
      pageTitle = <h2>Add User</h2>;
      actionStatus = <b>Save</b>;
    }
    const {
      UserID,
      FirstName,
      LastName,
      EmailID,
      MobileNo,
      Address,
      PinCode,
      SaveClick
    } = this.state;

    return (
      <div>
        <h2> {pageTitle}</h2>
        <input type="hidden" value={this.state.UserID} />
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="FirstName"
            type="text"
            placeholder="Enter First Name"
            value={this.state.FirstName}
            onChange={this.handleChange}
          />
          {SaveClick && !FirstName && (
            <div className="ErrorClass">First Name is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="LastName"
            type="text"
            placeholder="Enter Last Name"
            value={this.state.LastName}
            onChange={this.handleChange}
          />
          {SaveClick && !LastName && (
            <div className="ErrorClass">Last Name is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="EmailID"
            type="text"
            placeholder="Enter EmailID"
            value={this.state.EmailID}
            onChange={this.handleChange}
          />
          {SaveClick && !EmailID && (
            <div className="ErrorClass">EmailID is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="MobileNo"
            type="text"
            placeholder="Enter MobileNo"
            value={this.state.MobileNo}
            onChange={this.handleChange}
          />
          {SaveClick && !MobileNo && (
            <div className="ErrorClass">MobileNo is Required </div>
          )}
        </div>
        <div className="divtxtBox">
          <input
            className="txtBox"
            name="Address"
            type="text"
            placeholder="Enter Address"
            value={this.state.Address}
            onChange={this.handleChange}
          />
          <div className="divtxtBox">
            <input
              className="txtBox"
              name="PinCode"
              type="text"
              placeholder="Enter PinCode"
              value={this.state.PinCode}
              onChange={this.handleChange}
            />
            {SaveClick && !PinCode && (
              <div className="ErrorClass">PinCode is Required </div>
            )}
          </div>
          <div className="divtxtBox">
            <button className="btn" onClick={this.WriteFileData}>
              {actionStatus}{" "}
            </button>
            <button className="btn" onClick={this.Reset}>
              {" "}
              {this.state.UserID ? "cancel" : "Reset"}{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUsers;
