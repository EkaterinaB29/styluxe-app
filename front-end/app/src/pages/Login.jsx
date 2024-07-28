import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../context/UserContext';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwShown, setPwShown] = useState(false);
  const [error, setError] = useState('');
  const { setUser, setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://88.200.63.148:8211/api/user/login', {
        email,
        password,
      }, { withCredentials: true }); // Ensure credentials are sent

      const { token, role } = response.data;
      console.log('Login response:', response.data);
      Cookies.set('token', token, { sameSite: 'Strict', secure: process.env.NODE_ENV === 'production' });
      setRole(role);

      const config = {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        withCredentials: true, // Ensure credentials are sent
      };

      if (role === 'Professional') {
        const professionalResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/professional', config);
        console.log('Professional response:', professionalResponse.data);
        setUser(professionalResponse.data);
        navigate('/profile/professional');
      } else if (role === 'Client') {
        const clientResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/client', config);
        console.log('Client response:', clientResponse.data);
        setUser(clientResponse.data);
        navigate('/profile/client');
      } else {
        console.log('Unknown role:', role);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid login credentials');
      console.error('Error during login:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="overlay">
      <form onSubmit={handleLogin}>
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
            <input
              className="form-input"
              id="txt-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <br />
            <span className="input-item">
              <i className="fa fa-key"></i>
            </span>
            <input
              className="form-input"
              type={pwShown ? "text" : "password"}
              placeholder="Password"
              id="pwd"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <span onClick={togglePasswordVisibility}>
              <i className={`fa fa-eye${pwShown ? "" : "-slash"}`} aria-hidden="true" id="eye"></i>
            </span>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="log-in" type="submit"> Log In </button>
          </div>
          <div className="other">
            <button className="btn submits frgt-pass">Forgot Password</button>
            <button className="btn submits sign-up" onClick={() => navigate('/register')}>
              Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
