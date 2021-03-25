import React from "react";
import "./login.css";
const Login = () => {
  return (
    <div className="login card">
      <div className="d-flex">
        <p>Email:</p>
        <input type="email" className="float-right" />
      </div>
      <div className="d-flex">
        <p>Password: </p>
        <input type="password" className="float-right" />
      </div>
    </div>
  );
};

export default Login;
