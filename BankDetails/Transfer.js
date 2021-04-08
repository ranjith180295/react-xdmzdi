import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
class TransferCom extends React.Component {
  constructor(props) {
    super(props);

    //Initializing State
    this.state = {
      route: "form",
      fromAccount: 0,
      toAccount: 0,
      transferType: "",
      ammount: 0,
      memo: {
        text: "",
        len: 0
      },
      fromAccounts: [
        { id: "1234", amount: 1212.0, name: "Select From Account" },
        { id: "2345", amount: 1412.0, name: "Saving Account - 3036****1234 " },
        { id: "3456", amount: 1612.0, name: "Current Account - 3036****1256 " }
      ],
      toAccounts: [
        { id: "01234", amount: 1412.0, name: "Select To Account" },
        { id: "12345", amount: 1612.0, name: "Kiran - 123****45 " },
        { id: "23456", amount: 1812.0, name: "Rajesh - 234****56 " },
        { id: "34567", amount: 1912.0, name: "Ravi - 345****67 " },
        { id: "45678", amount: 2012.0, name: "Sam - 456****78 " }
      ],
      startDate: this.getToday(),
      endDate: null,
      frequency: null,
      modal: false,
      form: [],
      errors: []
    };
  }

  //Helper Functions
  changeFrom(event) {
    const fromAccount = event.target.value;
    let toAccounts = [...this.state.toAccounts];
    // toAccounts = _.without(toAccounts, _.find(toAccounts, ["id", fromAccount]));
    const toAccount =
      fromAccount === this.state.toAccount ? 0 : this.state.toAccount;
    this.setState({ fromAccount, toAccounts, toAccount });
  }

  changeTo(event) {
    this.setState({ toAccount: event.target.value });
  }

  changeAmmount(event) {
    this.setState({ ammount: event.target.value });
  }

  changeMemo(event) {
    this.setState({
      memo: { text: event.target.value, len: event.target.value.length }
    });
  }

  changeTransfer(event) {
    this.setState({
      transferType: event.target.value,
      endDate: null,
      frequency: null
    });
  }

  changeFrequency(event) {
    this.setState({ frequency: event.target.value });
  }

  changeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  changeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  showModal(modal) {
    this.setState({ modal });
  }

  confirmSubmit() {
    this.setState({ modal: false, route: "confirm" });
  }
  restart() {
    this.setState({
      route: "form",
      fromAccount: 0,
      toAccount: 0,
      transferType: "",
      ammount: 0,
      memo: {
        text: "",
        len: 0
      },
      startDate: this.getToday(),
      endDate: null,
      frequency: null,
      modal: false,
      form: [],
      errors: []
    });
  }
  setRoute(route) {
    this.setState({ route });
  }

  validate() {
    let errors = {};
    let valid = true;
    if (!this.state.fromAccount)
      errors.fromAccount = "From Account Field is Required";
    if (!this.state.toAccount)
      errors.toAccount = "To Account Field is Required";
    if (!this.state.startDate)
      errors.startDate = "From Account Field is Required";
    if (!this.state.ammount) errors.ammount = "Ammount Field is Required";
    if (!this.state.transferType) {
      errors.transferType = "Transfer Type Field is Required";
    } else if (this.state.transferType === "Automatic Transfer") {
      if (!this.state.endDate) errors.endDate = "End Date Field is Required";
      if (!this.state.frequency)
        errors.frequency = "Frequency Field is Required";
    }

    if (Object.getOwnPropertyNames(errors).length > 0) valid = false;
    this.setState({ errors });
    console.log(errors);
    return valid;
  }

  getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    today = yyyy + "-" + mm + "-" + dd;

    return today;
  }

  //Handle Form Submitting
  handleSubmit(event) {
    event.preventDefault();
    if (!this.validate()) return;
    this.setState({
      modal: true,
      form: [
        { "From Account": this.state.fromAccount },
        { "To Account": this.state.toAccount },
        { "Transfer Type": this.state.transferType },
        { Date: this.state.startDate },
        { "End Date": this.state.endDate },
        { Frequency: this.state.frequency },
        { Amount: "Rs. " + this.state.ammount },
        { Remarks: this.state.memo.text }
      ]
    });
  }

  //Helper Render Function
  showHiddenFields(radio) {
    if (radio === "One Time Transfer") {
      return (
        <fieldset className={this.state.errors.startDate ? "error" : ""}>
          <label className="main-label">Transfer Date</label>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.changeStartDate.bind(this)}
          />
          <i className="fa fa-calendar fa-fw" />
        </fieldset>
      );
    } else if (radio === "Automatic Transfer") {
      return (
        <HiddenFields
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          frequency={this.state.frequency}
          changeStartDate={this.changeStartDate.bind(this)}
          changeEndDate={this.changeEndDate.bind(this)}
          changeFrequency={this.changeFrequency.bind(this)}
          errors={this.state.errors}
        />
      );
    }
  }

  renderModal() {
    if (!this.state.modal) return;
    console.log("Showing Modal");
    return (
      <div className="modalWindow">
        <div className="modal-content">
          <a
            href="#"
            className="close-button"
            onClick={() => {
              this.showModal(false);
            }}
          />
          <Verify
            form={this.state.form}
            showModal={this.showModal.bind(this)}
            confirmSubmit={this.confirmSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }

  router(route) {
    if (route === "form") {
      return (
        <div>
          <NavBar />
          <h3>Transfer Funds</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Select
              onChange={this.changeFrom.bind(this)}
              account={this.state.fromAccount}
              title="From account"
              css_class={
                this.state.errors.fromAccount
                  ? "half-width error"
                  : "half-width"
              }
              serverResponse={this.state.fromAccounts}
            />
            <Select
              onChange={this.changeTo.bind(this)}
              account={this.state.toAccount}
              title="To account"
              css_class={
                this.state.errors.toAccount
                  ? "half-width right error"
                  : "half-width right"
              }
              serverResponse={this.state.toAccounts}
            />
            <fieldset
              className={
                this.state.errors.transferType
                  ? "half-width error"
                  : "half-width"
              }
            >
              <label className="main-label">Transfer Type</label>
              <input
                type="radio"
                name="rad_transferType"
                id="radTransferType_ott"
                value="One Time Transfer"
                onClick={this.changeTransfer.bind(this)}
              />
              <label htmlFor="radTransferType_ott">One-Time Transfer</label>
              <br />
              <input
                type="radio"
                name="rad_transferType"
                id="radTransferType_at"
                value="Automatic Transfer"
                onClick={this.changeTransfer.bind(this)}
              />
              <label htmlFor="radTransferType_at">Automatic Transfer</label>
            </fieldset>
            <fieldset
              className={
                this.state.errors.ammount
                  ? "half-width right error"
                  : "half-width right"
              }
            >
              <label className="main-label">Amount</label>
              <i className="fa fa-inr fa-fw" />
              <input
                type="number"
                value={this.state.ammount}
                onChange={this.changeAmmount.bind(this)}
              />
            </fieldset>
            {this.showHiddenFields(this.state.transferType)}
            <Memo
              onChange={this.changeMemo.bind(this)}
              memo={this.state.memo}
              maxlen={120}
            />
            <fieldset className="button-holder">
              <input
                type="button"
                className="button simpleButton"
                value="Cancel"
              />
              <input type="submit" className="button CTAButton" value="Next" />
            </fieldset>
          </form>
        </div>
      );
    } else if (route === "confirm") {
      return (
        <div>
          <NavBar />
          <Confirm form={this.state.form} setRoute={this.restart.bind(this)} />
        </div>
      );
    } else if (route === "profile") {
      return (
        <div>
          <NavBar />
          <Profile />
        </div>
      );
    } else if (route === "home") {
      return (
        <div>
          <NavBar />
          <Home />
        </div>
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="divMain">
        <section className="mainSection">
          {this.router(this.state.route)}
        </section>
        <input
          type="checkbox"
          name="chkOpenMenu"
          id="chkOpenMenu"
          className="hide"
        />
        <label htmlFor="chkOpenMenu" className="lblOpenMenu smallDisplay">
          <span className="openItem" />
          <span className="closeItem" />
        </label>
        <Footer />
        <input
          type="checkbox"
          name="chkShowFooter"
          id="chkShowFooter"
          defaultChecked="true"
          className="hide"
        />
        {this.renderModal()}
      </div>
    );
  }
}

const Memo = props => {
  return (
    <fieldset>
      <label className="main-label">
        Remarks (OPTIONAL: Maximum of {props.maxlen} characters)
      </label>
      <textarea
        maxLength={props.maxlen}
        id="memoText"
        onChange={props.onChange}
        value={props.memo.text}
      />
      <span>{props.maxlen - props.memo.len} characters remaining.</span>
    </fieldset>
  );
};

class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //Load Data here!
  }

  render() {
    return (
      <fieldset className={this.props.css_class}>
        <label>{this.props.title}</label>
        <i className="fa fa-user fa-fw" />
        <select onChange={this.props.onChange} value={this.props.account}>
          {this.props.serverResponse.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </fieldset>
    );
  }
}

const HiddenFields = props => {
  return (
    <div>
      <fieldset
        className={props.errors.startDate ? "half-width error" : "half-width"}
      >
        <label className="main-label">Start Date</label>
        <input
          type="date"
          value={props.startDate}
          onChange={props.changeStartDate}
        />
        <i className="fa fa-calendar fa-fw" />
      </fieldset>
      <fieldset
        className={
          props.errors.endDate ? "half-width right error" : "half-width right"
        }
      >
        <label className="main-label">End Date</label>
        <input
          type="date"
          value={props.endDate}
          onChange={props.changeEndDate}
        />
        <i className="fa fa-calendar fa-fw" />
      </fieldset>
      <fieldset className={props.errors.frequency ? "error" : ""}>
        <label className="main-label">Frequency</label>
        <select value={props.frequency} onChange={props.changeFrequency}>
          <option value="Weekly">Weekly</option>
          <option value="Bi-Monthly">1st and 15th of each month</option>
          <option value="Monthly">Every Month</option>
          <option value="Every Two Months">Every Two Months</option>
        </select>
        <i className="fa fa-refresh fa-fw" />
      </fieldset>
    </div>
  );
};

const Verify = props => {
  return (
    <div>
      <h3>Please verify your data</h3>
      <div className="modal-body">
        <Summary form={props.form} />
        <fieldset className="button-holder">
          <input
            type="button"
            className="button simpleButton"
            value="Previous"
            onClick={() => props.showModal(false)}
          />
          <input
            type="submit"
            className="button CTAButton"
            value="Submit"
            onClick={() => props.confirmSubmit()}
          />
        </fieldset>
      </div>
    </div>
  );
};

const Confirm = props => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = mm + "/" + dd + "/" + yyyy;
  return (
    <div className="confirm">
      <div className="notice success">
        <i className="fa fa-smile-o" />
        <p>
          Your transfer has been successfully completed on {today} with
          confirmation number {Math.random() * 10000000000000000}
        </p>
      </div>
      <h3>Summary</h3>
      <Summary form={props.form} />
      <div className="button-holder">
        <input
          type="button"
          className="button CTAButton"
          value="Do Another Transaction"
          onClick={() => props.setRoute("form")}
        />
      </div>
    </div>
  );
};

const Summary = props => {
  return (
    <dl>
      {props.form.map(field => {
        var key = Object.getOwnPropertyNames(field);
        if (!field[key[0]]) return null;
        return (
          <div key={key[0] + field[key[0]]}>
            <dt>{key[0]}</dt>
            <dd>{field[key[0]]}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default TransferCom;
