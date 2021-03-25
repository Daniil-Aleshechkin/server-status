import React, { Component } from "react";
import "./app.css";
import ConfigBtns from "./configBtn";
import Register from "./register";
class App extends Component {
  state = {
    serverStatus: "running",
    serverIp: "12.12.12.12",
    serverPlayers: 1,
    token: null,
  };
  render() {
    return (
      <div className="success-s p-4 h-100">
        <div className="card success-p h-100 ">
          <div className="card-body">
            <h1>Server status: running</h1>
            <h2>Ip: {this.state.serverIp}</h2>
            <h3>Player online: {this.state.serverPlayers}</h3>
            <ConfigBtns />
          </div>
          <div className="register-container">
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
