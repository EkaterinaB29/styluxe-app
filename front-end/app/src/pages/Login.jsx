import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import '../css/Login.css';
import { AuthContext } from '../components/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwShown, setPwShown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { email, password });
      console.log('Login: Received token and user:', response.data.token, response.data.user);

      // Store token and user in sessionStorage and update context
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.token);
      setUser(response.data.user);

      // Redirect to posts page
      navigate('/posts');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 400) {
        setError('User not found. Redirecting to registration...');
        setTimeout(() => {
          navigate('/register');
        }, 3000); // Redirect after 3 seconds
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="overlay">
      <form onSubmit={handleSubmit}>
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
