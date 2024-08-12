import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../context/UserContext';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pwShown, setPwShown] = useState(false);
  const { setUser, setRole, setIsAuthenticated, setLoading, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://88.200.63.148:8211/api/user/login', { email, password }, { withCredentials: true });

      const { role, token } = response.data;
      
      // Store the token in a cookie
      Cookies.set('token', token, { expires: 1 }); // Token expires in 1 day

      // Update the context with the token
      setToken(token);
      setRole(role);
      setIsAuthenticated(true);
      setLoading(true);

      const fetchProfile = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          };

          const profileResponse = role === 'Professional' ?
            await axios.get('http://88.200.63.148:8211/api/user/profile/professional', config) :
            await axios.get('http://88.200.63.148:8211/api/user/profile/client', config);

          setUser(profileResponse.data);
          navigate(role === 'Professional' ? '/profile/professional' : '/profile/client');
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          setError('Failed to fetch profile');
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
