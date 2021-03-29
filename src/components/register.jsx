import React from "react";
import "./register.css";

const Register = ({ onRegister, alerts }) => {
  return (
    <div>
      <div className="register card">
        {alerts.map((alert) => {
          return <div className="alert alert-danger">{alert}</div>;
        })}
        <div>
          <p>Email:</p>
          <input id="register-email" type="email" className="float-right" />
        </div>
        <div>
          <p>Username</p>
          <input id="register-username" type="text" className="float-right" />
        </div>
        <div>
          <p>Password</p>
          <input
            id="register-password"
            type="password"
            className="float-right"
          />
        </div>
        <div>
          <p>Confirm Password:</p>
          <input
            id="register-confirmpassword"
            type="password"
            className="float-right"
          />
        </div>
        <button onClick={onRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
