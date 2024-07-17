import Order from '../models/ordersModel.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
};

const createOrder = async (cart) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: 'CAPTURE',
        purchase_units: [{ 
            amount: { 
                currency_code: cart.currency,
                value: cart.amount 
            } 
        }]
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    });
    const jsonResponse = await response.json();
    return { jsonResponse, httpStatusCode: response.status };
};

const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const jsonResponse = await response.json();
    return { jsonResponse, httpStatusCode: response.status };
};

const createPayPalOrder = async (req, res) => {
    try {
        const { cart, user_id_from, user_id_to, amount } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(cart);

        const orderData = {
            order_id: jsonResponse.id,
            user_id_from,
            user_id_to,
            amount,
            status: 'PENDING',
            timestamp: new Date(),
            amount
        };

        await Order.create(orderData);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

const capturePayPalOrder = async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

        if (jsonResponse.status === 'COMPLETED') {
            await Order.updateStatus(orderID, 'PAID');
        }

        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
};

export { createPayPalOrder, capturePayPalOrder };