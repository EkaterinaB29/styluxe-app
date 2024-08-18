import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../css/PayPalPaymentPage.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PayPalPaymentPage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { service, professionalId } = location.state || {};

  const [isSdkReady, setIsSdkReady] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState(null);

  const getServiceDetails = (serviceId) => {
    const services = {
      1: { title: "General living space advices", description: "Up to 5 hours meetings", price: 29 },
      2: { title: "Complete room redesign ", description: "Interior and exterior works", price: 39 },
      3: { title: "Unique Furniture for living", description: "Complete apartment remodelling", price: 59 },
    };
    return services[serviceId];
  };

  const serviceDetails = getServiceDetails(serviceId);
  const currency = "EUR";

  useEffect(() => {
    if (!serviceId || !professionalId || !serviceDetails) {
      console.error("Missing service or professional data.");
      setAlerts(<div className="ms-alert ms-action2 ms-small"><span className="ms-close"></span><p>Missing service or professional data. Please go back and select a service.</p></div>);
      setLoading(false);
      return;
    }

    const loadPayPalSdk = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src^="https://www.paypal.com/sdk/js?client-id=AeOXxe44mQC4gNOXKspUb5MbGxAE_1nbHwwahivZNYoLBnUhFjEAvTqwbFM--ltkn2L_HVA6-XcL7dKf"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AeOXxe44mQC4gNOXKspUb5MbGxAE_1nbHwwahivZNYoLBnUhFjEAvTqwbFM--ltkn2L_HVA6-XcL7dKf&components=buttons,hosted-fields&currency=${currency}&intent=capture`;
        script.async = true;
        script.onload = () => {
          console.log("PayPal SDK loaded successfully.");
          setIsSdkReady(true);
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load PayPal SDK");
          reject();
        };
        document.head.appendChild(script);
      });
    };

    const setupPayPal = async () => {
      if (isSdkReady) {
        const paypalContainer = document.getElementById("paypal-button-container");
        if (paypalContainer && paypalContainer.childNodes.length === 0) {
          window.paypal.Buttons({
            style: {
              color: "black",
              shape: "rect",
              layout: "vertical",
              label: "paypal",
            },
            createOrder: async () => {
               
              try {
                const user_id_from = localStorage.getItem("logged_in_user_id");
                const response = await fetch("http://88.200.63.148:8211/api/orders/create_order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json; charset=utf-8" },
                  body: JSON.stringify({
                    intent: "capture",
                    amount: serviceDetails.price,
                    currency,
                    user_id_from, 
                    user_id_to: professionalId, 
                  }),
                });
                const order = await response.json();
                setOrderId(order.id);
                return order.id;
              } catch (error) {
                console.error("Failed to create order", error);
                setAlerts(<div className="ms-alert ms-action2 ms-small"><span className="ms-close"></span><p>Failed to create order. Please try again.</p></div>);
              }
            },
            onApprove: async (data) => {
              try {
                const response = await fetch("http://88.200.63.148:8211/api/orders/complete_order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json; charset=utf-8" },
                  body: JSON.stringify({
                    order_id: data.orderID,
                    intent: "capture",
                  }),
                });
                const order_details = await response.json();
                displaySuccessMessage(order_details);
              } catch (error) {
                console.error("Failed to capture order", error);
                setAlerts(<div className="ms-alert ms-action2 ms-small"><span className="ms-close"></span><p>Failed to capture order. Please try again.</p></div>);
              }
            },
            onCancel: () => {
              setAlerts(<div className="ms-alert ms-action2 ms-small"><span className="ms-close"></span><p>Order cancelled!</p></div>);
            },
            onError: (err) => {
              console.error("Error with payment:", err);
              setAlerts(<div className="ms-alert ms-action2 ms-small"><span className="ms-close"></span><p>An Error Occurred! (View console for more info)</p></div>);
            },
          }).render("#paypal-button-container");
        }
        setLoading(false);
      }
    };

    loadPayPalSdk().then(setupPayPal).catch(console.error);
  }, [isSdkReady, serviceId, professionalId, serviceDetails]);

  const displaySuccessMessage = (order_details) => {
    setAlerts(
      <div className="ms-alert ms-action">
        Thank you {order_details.payer.name.given_name} {order_details.payer.name.surname} for your payment of {order_details.purchase_units[0].payments.captures[0].amount.value} {order_details.purchase_units[0].payments.captures[0].amount.currency_code}!
      </div>
    );
  };

  if (loading) {
    return <div id="loading" className="spinner-container ms-div-center"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <NavBar />

    <div className="container">
      
      <h1>Pay for Service</h1>
      <p>Service: {serviceDetails?.title}</p>
      <p>Description: {serviceDetails?.description}</p>
      <p>Price: €{serviceDetails?.price} EUR</p>

      <div id="alerts">{alerts}</div>

      <div id="paypal-button-container"></div>

      {!serviceDetails && (
        <button className="ms-fullwidth mt-2 ms-medium" onClick={() => navigate('/services')}>
          Go Back to Services
        </button>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default PayPalPaymentPage;
