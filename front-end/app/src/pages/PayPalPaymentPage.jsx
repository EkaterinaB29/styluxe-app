import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming you have a UserContext for logged-in user
import '../css/PayPalPaymentPage.css';

const PayPalPaymentPage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access the logged-in user from context
  const [orderID, setOrderID] = useState(null);

  const professionalId = location.state?.professionalId;

  const serviceDetails = getServiceDetails(serviceId);

  useEffect(() => {
    console.log('User:', user.id);
    console.log('Professional ID:', professionalId);
    console.log('Service Details:', serviceDetails);

    if (!user || !professionalId || !serviceDetails) {
      console.error('Missing user, professional ID, or service details.');
      return;
    }

    const loadPayPalScript = async () => {
      console.log('Loading PayPal Script...');
      return new Promise((resolve, reject) => {
        if (!window.paypal) {
          const script = document.createElement('script');
          script.src = `https://www.paypal.com/sdk/js?client-id=AeOXxe44mQC4gNOXKspUb5MbGxAE_1nbHwwahivZNYoLBnUhFjEAvTqwbFM--ltkn2L_HVA6-XcL7dKf&components=buttons,hosted-fields`;
          script.onload = () => {
            console.log('PayPal SDK Loaded');
            resolve();
          };
          script.onerror = () => {
            console.error('PayPal SDK failed to load.');
            reject(new Error('PayPal SDK failed to load.'));
          };
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const initializePayPal = () => {
      console.log('Initializing PayPal Buttons...');
      if (!window.paypal) {
        console.error('PayPal SDK not found.');
        return;
      }
      window.paypal.Buttons({
        style: {
          shape: "pill",
          layout: "vertical",
          color: "black",
          label: "buynow",
        },
        createOrder: async () => {
          console.log('Creating PayPal Order...');
          try {
            const response = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: serviceDetails.price,
                currency: 'EUR',
                //user_id_from: user.id,
                user_id_to: professionalId,
              }),
            });

            const orderData = await response.json();
            console.log('Order Data:', orderData);

            if (orderData.id) {
              setOrderID(orderData.id);
              return orderData.id;
            }
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          } catch (error) {
            console.error('Error creating order:', error);
            alert(`Could not initiate PayPal Checkout... ${error}`);
          }
        },
        onApprove: async (data, actions) => {
          console.log('Order Approved, Capturing...');
          try {
            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const orderData = await response.json();
            console.log('Capture Data:', orderData);
            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            } else if (errorDetail) {
              throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
              throw new Error(JSON.stringify(orderData));
            } else {
              const transaction =
                orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
              alert(`Transaction ${transaction.status}: ${transaction.id}`);
              console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
              navigate('/success');
            }
          } catch (error) {
            console.error('Error capturing order:', error);
            alert('Payment failed!');
          }
        },
        onError: (err) => {
          console.error('Error with PayPal Buttons:', err);
          alert('An error occurred with PayPal. Please try again.');
        },
      }).render('#paypal-button-container');
    };

    loadPayPalScript()
      .then(initializePayPal)
      .catch((error) => {
        console.error('Failed to load PayPal SDK:', error);
        alert('Failed to load PayPal SDK. Please try again later.');
      });

    return () => {
      const buttonContainer = document.getElementById('paypal-button-container');
      if (buttonContainer) buttonContainer.innerHTML = '';
    };
  }, [serviceDetails, user, professionalId, navigate]);

  if (!user) {
    return <div>Please log in to proceed with payment.</div>;
  }

  if (!professionalId) {
    return <div>Professional not selected. Please go back and select a professional.</div>;
  }

  return (
    <div className="paypal-payment-page">
      <h1>{serviceDetails?.title}</h1>
      <p>{serviceDetails?.description}</p>
      <p>Price: ${serviceDetails?.price}</p>

      <div id="paypal-button-container"></div>
    </div>
  );
};

// Assuming getServiceDetails is a function that retrieves service details based on the serviceId
const getServiceDetails = (serviceId) => {
  const services = {
    1: { title: "General living space advices", description: "Up to 5 hours meetings", price: 100 },
    2: { title: "Complete home redesign", description: "Interior and exterior works", price: 200 },
    3: { title: "Furniture for living room", description: "Sofas and armchairs", price: 150 },
    // Add more services as needed
  };
  return services[serviceId];
};

export default PayPalPaymentPage;
