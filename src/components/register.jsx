import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div>
      <div className="register card">
        <div>
          <p>Email:</p>
          <input type="text" className="float-right" />
        </div>
        <div>
          <p>Username</p>
          <input type="text" className="float-right" />
        </div>
        <div>
          <p>Password</p>
          <input type="text" className="float-right" />
        </div>
        <div>
          <p>Confirm Password:</p>
          <input type="text" className="float-right" />
        </div>
        <button className="btn btn-primary">Register</button>
      </div>
    </div>
  );
};

export default Register;
