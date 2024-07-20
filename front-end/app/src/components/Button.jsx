import React from 'react';
import '../css/Button.css';

const Button = ({ text }) => {
  return (
    <div className="button">
      <div className="top">
        <div className="text">
          {text.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="text">
          {text.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Button;
