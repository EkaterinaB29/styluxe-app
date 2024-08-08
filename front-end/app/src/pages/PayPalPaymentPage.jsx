import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PayPalPaymentPage.css';

const PayPalPaymentPage = () => {
  const { serviceId } = useParams();
  const [orderID, setOrderID] = useState(null);

  console.log('PayPalPaymentPage rendered with serviceId:', serviceId);

  const getServiceDetails = (serviceId) => {
    const services = {
      1: { title: "General living space advices", description: "Up to 5 hours meetings", price: 100 },
      2: { title: "Complete home redesign", description: "Interior and exterior works", price: 200 },
      3: { title: "Furniture for living room", description: "Sofas and armchairs", price: 150 },
      // Add more services as needed
    };
    return services[serviceId];
  };

  const serviceDetails = getServiceDetails(serviceId);

  useEffect(() => {
    const loadPayPalScript = async () => {
      console.log('Loading PayPal script...');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: serviceDetails.price,
          currency: 'USD', // Adjust as needed
          user_id_from: 1, // Replace with actual user ID
          user_id_to: 2 // Replace with actual user ID
        }),
      });

      const data = await response.json();
      setOrderID(data.id);

      console.log('PayPal order created with ID:', data.id);

      if (window.paypal) {
        window.paypal.HostedFields.render({
          createOrder: () => data.id,
          styles: {
            '.valid': {
              color: 'green',
            },
            '.invalid': {
              color: 'red',
            },
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: 'Card Number',
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'CVV',
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'MM/YY',
            },
          },
        }).then((hostedFields) => {
          console.log('PayPal Hosted Fields rendered');
          document.querySelector('#card-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = await hostedFields.submit({
              contingencies: ['3ds'],
            });

            const captureResponse = await fetch(`/api/orders/${data.id}/capture`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (captureResponse.ok) {
              alert('Payment Successful!');
            } else {
              alert('Payment failed!');
            }
          });
        });
      } else {
        console.error('PayPal script not loaded');
      }
    };

    loadPayPalScript();
  }, [serviceDetails]);

  return (
    <div className="paypal-payment-page">
      <h1>{serviceDetails?.title}</h1>
      <p>{serviceDetails?.description}</p>
      <p>Price: ${serviceDetails?.price}</p>

      <form id="card-form">
        <div id="card-number" className="card-field"></div>
        <div id="cvv" className="card-field"></div>
        <div id="expiration-date" className="card-field"></div>
        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PayPalPaymentPage;
