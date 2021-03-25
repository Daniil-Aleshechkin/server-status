import React, { Component } from "react";
import CIcon from "@coreui/icons-react";
import "./app.css";
import ConfigBtns from "./configBtn";
import Register from "./register";
import Login from "./login";
class App extends Component {
  state = {
    serverStatus: "running",
    serverIp: "12.12.12.12",
    serverPlayers: 1,
    hours: 6.3,
    loginPage: false,
    token: null,
  };
  configBtnOperations = {
    onStop: () => {},
    onStart: () => {},
    onRefresh: () => {},
  };
  onLoginPageLoad = () => {
    this.setState({ loginPage: true });
  };
  onRegisterPageLoad = () => {
    this.setState({ loginPage: false });
  };
  renderAccountPage = () => {
    if (this.state.loginPage) {
      return <Login />;
    }
    return <Register />;
  };
  render() {
    return (
      <div className="success-p p-4 h-100">
        <div className="card success-s h-100 ">
          <div className="d-flex flex-column card-body">
            <h1>Server status: running</h1>
            <h2>Ip: {this.state.serverIp}</h2>
            <h3>Players online: {this.state.serverPlayers}</h3>
            <h3>Uptime: {this.state.hours} hours</h3>
            <ConfigBtns />
            <p>Welcome USER</p>
          </div>
          <div className="register-container">
            <CIcon className="status-icon" name="cilCheck" />
            <div>
              {this.renderAccountPage()}
              <div className="login-btns">
                <button
                  onClick={this.onLoginPageLoad}
                  className="btn btn-primary"
                >
                  Login
                </button>
                <button
                  onClick={this.onRegisterPageLoad}
                  className="btn btn-primary"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
