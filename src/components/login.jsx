import React from "react";
import "./login.css";
const Login = ({ onLogin, alerts }) => {
  return (
    <div className="login card">
      {alerts.map((alert) => {
        return <div className="alert alert-danger">{alert}</div>;
      })}
      <div className="d-flex">
        <p>Email:</p>
        <input id="login-username" type="email" className="float-right" />
      </div>
      <div className="d-flex">
        <p>Password: </p>
        <input id="login-password" type="password" className="float-right" />
      </div>
      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
