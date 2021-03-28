import React from "react";
import "./login.css";
const Login = ({ onLogin }) => {
  return (
    <div className="login card">
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
