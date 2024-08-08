import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ServiceCard.css'; // Make sure to link to your CSS file for the ServiceCard component

const ServiceCard = ({ serviceId, title, price, features }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate(`/paypal-payment/${serviceId}`);
  };

  return (
    <div className="pricing-item" onClick={handleGetStartedClick}>
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
