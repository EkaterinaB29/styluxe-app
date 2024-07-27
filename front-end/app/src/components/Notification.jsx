import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../css/Notification.css';

const Notification = ({ text }) => {
  return (
    <div className="notification-container">
      <div className="notification-text">{text}</div>
      <div className="notification-prompts">
        <p className="notification-prompt">Don't have an account?      Already a member?</p>
        
      </div>
      <div className="notification-buttons">
        <Link to="/register">
          <Button text="Join the community" type="primary" />
        </Link>
        <Link to="/login">
          <Button text="Log In" type="default" />
        </Link>
      </div>
    </div>
  );
};

export default Notification;
