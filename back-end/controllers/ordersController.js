import fetch from 'node-fetch';
import Order from '../models/ordersModel.js';
import paypalConfig from '../config/paypalConfig.js';

export const createPayPalOrder = async (req, res) => {
    const { amount, currency, user_id_from, user_id_to } = req.body;

    const orderData = {
        status: 'PENDING',
        timestamp: new Date(),
        user_id_from,
        user_id_to,
        amount,
        currency
    };

    try {
        const orderId = await Order.create(orderData);

        const response = await fetch(`${paypalConfig.base}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await paypalConfig.generateAccessToken()}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: currency,
                        value: amount
                    }
                }]
            })
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            await Order.updatePayPalOrderId(orderId, jsonResponse.id);
            res.status(201).json(jsonResponse);
        } else {
            res.status(500).json(jsonResponse);
        }
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).json({ error: 'Error creating PayPal order' });
    }
};

export const capturePayPalOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const response = await fetch(`${paypalConfig.base}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await paypalConfig.generateAccessToken()}`
            }
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            // Update the order status to 'COMPLETED' in the database
            await Order.updateStatusByPayPalOrderId(orderId, { status: 'COMPLETED' });
            res.status(200).json(jsonResponse);
        } else {
            res.status(500).json(jsonResponse);
        }
    } catch (error) {
        console.error('Error capturing PayPal order:', error);
        res.status(500).json({ error: 'Error capturing PayPal order' });
    }
};
