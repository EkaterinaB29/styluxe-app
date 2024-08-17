import fetch from 'node-fetch';
import Order from '../models/ordersModel.js';
import { base, generateAccessToken } from '../config/paypalConfig.js';

// Create PayPal order
export const createPayPalOrder = async (req, res) => {
    const { intent, amount , currency, user_id_from, user_id_to  } = req.body;

    try {
        const accessToken = await generateAccessToken();

        const orderData = {
            intent: intent.toUpperCase(),
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: amount
                }
            }]
        };

        const response = await fetch(`${base}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(orderData)
        });

        
        const jsonResponse = await response.json();



        if (response.ok) {
            
            const createdOrder = await Order.create({
                timestamp: new Date(),
                status: 'PENDING',
                paypal_order_id: jsonResponse.id,
                amount,
                currency,
                user_id_from,
                user_id_to
            });
            console.log('Order Saved:', createdOrder); // Debugging
            res.status(201).json(jsonResponse);
        } else {
            res.status(500).json(jsonResponse);
        }
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).json({ error: 'Error creating PayPal order' });
    }
};

// Capture PayPal order
export const capturePayPalOrder = async (req, res) => {
    const { order_id, intent } = req.body;

    try {
        const accessToken = await generateAccessToken();

        const response = await fetch(`${base}/v2/checkout/orders/${order_id}/${intent}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            // Update the order status to 'COMPLETED' in the database
            await Order.updateStatusByPayPalOrderId(order_id, { status: 'COMPLETED' });
            res.status(200).json(jsonResponse);
        } else {
            res.status(500).json(jsonResponse);
        }
    } catch (error) {
        console.error('Error capturing PayPal order:', error);
        res.status(500).json({ error: 'Error capturing PayPal order' });
    }
};

// Get client token
export const getClientToken = async (req, res) => {
    try {
        const accessToken = await generateAccessToken();

        const payload = req.body.customer_id ? JSON.stringify({ customer_id: req.body.customer_id }) : null;

        const response = await fetch(`${base}/v1/identity/generate-token`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: payload
        });

        const data = await response.json();

        res.status(200).json({ client_token: data.client_token });
    } catch (error) {
        console.error('Error generating client token:', error);
        res.status(500).json({ error: 'Failed to generate client token' });
    }
};
