import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import ServiceCard from '../components/ServiceCard';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import UserContext
import '../css/ServicesPage.css';
import banner from '../images/hands.jpg'; 
 

const ServicesPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access the logged-in user from context
  const [professionals, setProfessionals] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState('');

  useEffect(() => {
    // Fetch the list of professionals
    axios.get('http://88.200.63.148:8211/api/user/professionals')
      .then((response) => setProfessionals(response.data))
      .catch((error) => console.error('Error fetching professionals:', error));
  }, []);

  const handleGetStartedClick = (service) => {
    setSelectedService(service);
  };

  const handleProfessionalSelect = (e) => {
    setSelectedProfessional(e.target.value);
  };

  const handleContinueToPayment = () => {
    if (selectedProfessional && selectedService && user) { // Ensure user is defined
      navigate(`/paypal-payment/${selectedService.serviceId}`, {
        state: {
          service: selectedService,
          professionalId: selectedProfessional,
          userId: user.id, 
        },
      });
    } else {
      alert("Please select a professional and ensure you are logged in before continuing to payment.");
    }
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
              onGetStartedClick={() => handleGetStartedClick({ serviceId: 1, name: 'Design advices', price: 29 })}
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
              onGetStartedClick={() => handleGetStartedClick({ serviceId: 2, name: 'Complete interior', price: 39 })}
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
              onGetStartedClick={() => handleGetStartedClick({ serviceId: 3, name: 'Furniture design', price: 59 })}
            />
          </div>
        </div>
      </section>

      {/* Professional selection section */}
      {selectedService && (
        <section className="professional-selection">
          <div className="container">
            <h3>Select a Professional</h3>
            <select value={selectedProfessional} onChange={handleProfessionalSelect}>
              <option value="">--Select Professional--</option>
              {professionals.map((professional) => (
                <option key={professional.user_id} value={professional.user_id}>
                  {professional.first_name} {professional.last_name} - {professional.email}
                </option>
              ))}
            </select>
            <button onClick={handleContinueToPayment} className="continue-button">
              Continue to Payment
            </button>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ServicesPage;