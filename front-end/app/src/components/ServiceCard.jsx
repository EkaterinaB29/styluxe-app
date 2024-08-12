// ServiceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ServiceCard.css';

const ServiceCard = ({ serviceId, title, price, features, onGetStartedClick }) => {
  return (
    <div className="pricing-item" onClick={() => onGetStartedClick(serviceId)}>
      <h3>{title}</h3>
      <p className="price">{price}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="get-started">Get Started</button>
    </div>
  );
};

export default ServiceCard;
