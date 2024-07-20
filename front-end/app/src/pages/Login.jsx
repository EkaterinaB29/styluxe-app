import React, { useState } from 'react';
import '../css//Login.css';

const Login = () => {
  const [pwShown, setPwShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  return (
    <div className="overlay">
      <form>
        <div className="con">
          <header className="head-form">
            <h2>Log In</h2>
            <p>login here using your username and password</p>
          </header>
          <br />
          <div className="field-set">
            <span className="input-item">
              <i className="fa fa-user-circle"></i>
            </span>
            <input className="form-input" id="txt-input" type="text" placeholder="@UserName" required />
            <br />
            <span className="input-item">
              <i className="fa fa-key"></i>
            </span>
            <input className="form-input" type={pwShown ? "text" : "password"} placeholder="Password" id="pwd" name="password" required />
            <span onClick={togglePasswordVisibility}>
              <i className={`fa fa-eye${pwShown ? "" : "-slash"}`} aria-hidden="true" id="eye"></i>
            </span>
            <br />
            <button className="log-in"> Log In </button>
          </div>
          <div className="other">
            <button className="btn submits frgt-pass">Forgot Password</button>
            <button className="btn submits sign-up">
              Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
