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
    alerts: [],
  };
  componentDidMount() {
    this.configBtnOperations.onRefresh();
  }
  configBtnOperations = {
    onStop: () => {
      axios
        .post(
          "server/stop",
          {},
          { headers: { Authorization: `Token ${this.state.token}` } }
        )
        .then((response) => {
          if (response.data.status === "Instance should now be stopping") {
            this.setState({ serverStatus: "stopping" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onStart: () => {
      axios
        .post(
          "server/start",
          {},
          { headers: { Authorization: `Token ${this.state.token}` } }
        )
        .then((response) => {
          if (response.data.status === "Instance should now be pending") {
            this.setState({ serverStatus: "pending" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
          var alerts = [];
          Object.keys(e.response.data).forEach((key) => {
            e.response.data[key].forEach((error) => {
              alerts.push(`${key}: ${error}`);
            });
          });
          this.setState({ alerts });
        });
    },
    onRegister: () => {
      let username = document.getElementById("register-username").value;
      let email = document.getElementById("register-email").value;
      let password = document.getElementById("register-password").value;
      let confirmPassword = document.getElementById("register-confirmpassword")
        .value;

      axios
        .post("account/api/register/", {
          username,
          email,
          password,
          confirmPassword,
        })
        .then((response) => {
          this.setState({
            token: response.data.token,
            is_staff: false,
            username: response.data.username,
          });
        })
        .catch((e) => {
          console.log(e);
          var alerts = [];
          Object.keys(e.response.data).forEach((key) => {
            e.response.data[key].forEach((error) => {
              alerts.push(`${key}: ${error}`);
            });
          });
          this.setState({ alerts });
        });
    },
  };
  onLoginPageLoad = () => {
    this.setState({ loginPage: true, alerts: [] });
  };
  onRegisterPageLoad = () => {
    this.setState({ loginPage: false, alerts: [] });
  };
  renderAccountPage = () => {
    if (this.state.loginPage) {
      return (
        <Login onLogin={this.userControls.onLogin} alerts={this.state.alerts} />
      );
    }
    return (
      <Register
        onRegister={this.userControls.onRegister}
        alerts={this.state.alerts}
      />
    );
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
    if (this.state.serverPlayers || this.state.serverPlayers === 0) {
      return <h3>Players online: {this.state.serverPlayers}</h3>;
    } else if (this.state.serverStatus === "running") {
      return <h3>Minecraft server starting...</h3>;
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
  renderTheme = () => {
    if (this.state.serverStatus === "running") {
      return "success";
    } else {
      return "danger";
    }
  };
  renderIcon = () => {
    if (this.state.serverStatus === "running") {
      return "Check";
    } else {
      return "Warning";
    }
  };
  render() {
    return (
      <div className={this.renderTheme() + "-p p-4 h-100"}>
        <div className={this.renderTheme() + "-s card h-100 "}>
          <div className="d-flex flex-column card-body">
            <h1>Server status: {this.state.serverStatus}</h1>
            <h2>Uptime: {this.state.hours} hours</h2>
            {this.renderIp()}
            {this.renderPlayers()}

            <ConfigBtns
              key="iofsonifs"
              permission={this.state.is_admin}
              serverStatus={this.state.serverStatus}
              configBtnOperations={this.configBtnOperations}
            />
            {this.renderWelcome()}
          </div>

          <div className="register-container">
            <CIcon className="status-icon" name={"cil" + this.renderIcon()} />
            <div>{this.renderRegister()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
