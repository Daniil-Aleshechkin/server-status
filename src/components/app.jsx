import React, { Component } from "react";
import CIcon from "@coreui/icons-react";
import "./app.css";
import ConfigBtns from "./configBtn";
import Register from "./register";
import Login from "./login";
import axios from "axios";
class App extends Component {
  state = {
    loginPage: false,
    token: null,
    username: null,
    is_admin: false,
  };
  componentDidMount() {
    this.configBtnOperations.onRefresh();
  }
  configBtnOperations = {
    onStop: () => {},
    onStart: () => {},
    onLogout: () => {
      this.setState({ token: null, is_admin: false, username: null });
    },
    onRefresh: () => {
      axios
        .get("activety/")
        .then((response) => {
          let serverIp = response.data.ip;
          let serverStatus = response.data.status;
          let hours = response.data["time up"];
          let serverPlayers = response.data["player count"];
          if (serverPlayers) {
            serverPlayers = serverPlayers / 60;
          }
          this.setState({ serverPlayers, serverStatus, serverIp, hours });
        })
        .catch((e) => console.log(e));
    },
  };
  userControls = {
    onLogin: () => {
      let username = document.getElementById("login-username").value;
      let password = document.getElementById("login-password").value;
      axios
        .post("account/api/login/", { username, password })
        .then((response) => {
          var token = response.data.token;
          console.log(token);
          axios
            .get("account/get", {
              headers: { Authorization: `Token ${token}` },
            })
            .then((response) => {
              this.setState({
                token,
                is_admin: response.data.is_staff,
                username: response.data.username,
              });
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  };
  onLoginPageLoad = () => {
    this.setState({ loginPage: true });
  };
  onRegisterPageLoad = () => {
    this.setState({ loginPage: false });
  };
  renderAccountPage = () => {
    if (this.state.loginPage) {
      return <Login onLogin={this.userControls.onLogin} />;
    }
    return <Register />;
  };
  renderWelcome = () => {
    if (this.state.username) {
      return <p>Welcome {this.state.username}</p>;
    } else {
      return <p>Please login to start/stop the server</p>;
    }
  };
  renderIp = () => {
    if (this.state.serverIp) {
      return <h3>Ip: {this.state.serverIp}</h3>;
    } else {
      return;
    }
  };
  renderPlayers = () => {
    if (this.state.serverPlayers) {
      return <h3>Players online: {this.state.serverPlayers}</h3>;
    } else {
      return;
    }
  };
  renderRegister = () => {
    if (!this.state.token) {
      return (
        <React.Fragment>
          {this.renderAccountPage()}
          <div className="login-btns">
            <button onClick={this.onLoginPageLoad} className="btn btn-primary">
              Login
            </button>
            <button
              onClick={this.onRegisterPageLoad}
              className="btn btn-primary"
            >
              Sign up
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <button
          onClick={this.configBtnOperations.onLogout}
          className="btn btn-primary"
        >
          Log out
        </button>
      );
    }
  };
  render() {
    return (
      <div className="success-p p-4 h-100">
        <div className="card success-s h-100 ">
          <div className="d-flex flex-column card-body">
            <h1>Server status: {this.state.serverStatus}</h1>
            <h2>Uptime: {this.state.hours} hours</h2>
            {this.renderIp()}
            {this.renderPlayers()}

            <ConfigBtns key="iofsonifs" permission={this.state.is_admin} />
            {this.renderWelcome()}
          </div>

          <div className="register-container">
            <CIcon className="status-icon" name="cilCheck" />
            <div>{this.renderRegister()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
