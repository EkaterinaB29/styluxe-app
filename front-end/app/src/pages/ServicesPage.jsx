import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import NavBar from '../components/NavBar.jsx';
import '../css/ServicesPage.css';
import banner from '../images/hands.jpg'; 
import Footer from '../components/Footer.jsx';
import icon1 from '../images/icon1.png'; 
import icon2 from '../images/icon2.png'; 
import icon3 from '../images/icon3.png'; 
import icon4 from '../images/icon4.png'; 
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleMeetProfessionalsClick = () => {
    navigate('/meet-professionals'); // Replace with your actual route
  };

  return (
    <div>
      <NavBar />
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
     
      <p>"Our interior design services are tailored to meet your unique needs and budget.</p>
      <p> Choose from our range of services to get started on your dream space today."</p>
      
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
          <button className="meet-professionals" onClick={handleMeetProfessionalsClick}>Meet Our Professionals</button>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2>Pricing & Plan</h2>
          <div className="pricing-items">
            <ServiceCard
              serviceId={1}
              title="Design advices"
              price="€29/month"
              features={[
                'General living space advices',
                'Renovation advices',
                'Interior design advices',
                'Furniture reorganization',
                'Up to 5 hours meetings'
              ]}
            />
            <ServiceCard
              serviceId={2}
              title="Complete interior"
              price="€39/month"
              features={[
                'Complete home redesign',
                'Interior and exterior works',
                'Modular interior planning',
                'Kitchen design',
                'Garages organization'
              ]}
            />
            <ServiceCard
              serviceId={3}
              title="Furniture design"
              price="€59/month"
              features={[
                'Furniture for living room',
                'Furniture refurbishment',
                'Sofas and armchairs',
                'Tables and chairs',
                'Kitchens'
              ]}
            />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default ServicesPage;
