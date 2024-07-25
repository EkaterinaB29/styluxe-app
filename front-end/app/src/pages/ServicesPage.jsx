import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../css/ServicesPage.css';
import banner from '../images/hands.jpg'; 

import icon1 from '../images/icon1.png'; 
import icon2 from '../images/icon2.png'; 
import icon3 from '../images/icon3.png'; 
import icon4 from '../images/icon4.png'; 

const ServicesPage = () => {
  return (
    <div>
      <NavBar />
      <div className="banner">
        <img src={banner} alt="Banner" />
        <div>
          <h1>Pricing & Plan</h1>
          <p>Home / Pricing</p>
        </div>
      </div>

      <section className="services">
        <div className="container">
          <h2>Services</h2>
          <div className="service-items">
            <div className="service-item">
              <img src={icon1} alt="Project Plan" />
              <h3>Project Plan</h3>
              <p>We provide detailed project plans to ensure your interior design project is executed smoothly and efficiently.</p>
            </div>
            <div className="service-item">
              <img src={icon2} alt="Interior Work" />
              <h3>Interior Work</h3>
              <p>Our interior work services cover everything from flooring to ceiling, creating a cohesive and stunning look for your space.</p>
            </div>
            <div className="service-item">
              <img src={icon3} alt="Retail Design" />
              <h3>Retail Design</h3>
              <p>We specialize in creating retail spaces that are both functional and visually appealing, enhancing the shopping experience for your customers.</p>
            </div>
            <div className="service-item">
              <img src={icon4} alt="Interior & Decoration Work" />
              <h3>Interior & Decoration Work</h3>
              <p>From selecting color schemes to sourcing unique decor pieces, we bring your vision to life with our interior and decoration services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2>Pricing & Plan</h2>
          <div className="pricing-items">
            <div className="pricing-item">
              <h3>Design advices</h3>
              <p className="price">$29/month</p>
              <ul>
                <li>General living space advices</li>
                <li>Renovation advices</li>
                <li>Interior design advices</li>
                <li>Furniture reorganization</li>
                <li>Up to 5 hours meetings</li>
              </ul>
              <button className="get-started">Get Started</button>
            </div>
            <div className="pricing-item popular">
              <h3>Complete interior</h3>
              <p className="price">$39/month</p>
              <ul>
                <li>Complete home redesign</li>
                <li>Interior and exterior works</li>
                <li>Modular interior planning</li>
                <li>Kitchen design</li>
                <li>Garages organization</li>
              </ul>
              <button className="get-started">Get Started</button>
            </div>
            <div className="pricing-item">
              <h3>Furniture design</h3>
              <p className="price">$59/month</p>
              <ul>
                <li>Furniture for living room</li>
                <li>Furniture refurbishment</li>
                <li>Sofas and armchairs</li>
                <li>Tables and chairs</li>
                <li>Kitchens</li>
              </ul>
              <button className="get-started">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
