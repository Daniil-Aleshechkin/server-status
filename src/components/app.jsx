import React, { Component } from "react";
import "./app.css";
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
            <h2>ip: {this.state.serverIp}</h2>
          </div>
          <div className="card-body">Server Status: running</div>
        </div>
      </div>
    );
  }
}

export default App;
