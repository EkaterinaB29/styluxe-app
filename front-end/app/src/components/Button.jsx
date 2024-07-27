import React from 'react';
import '../css/Button.css';

const Button = ({ text, type = 'default' }) => {
  return (
    <div className={`button ${type}`}>
      <div className="text">{text}</div>
    </div>
  );
};

export default Button;
