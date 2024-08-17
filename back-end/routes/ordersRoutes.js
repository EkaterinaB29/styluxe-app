import express from 'express';
import { createPayPalOrder, capturePayPalOrder, getClientToken } from '../controllers/ordersController.js';

const router = express.Router();

// Route to create a PayPal order
router.post('/create_order', createPayPalOrder);

// Route to capture a PayPal order
router.post('/complete_order', capturePayPalOrder);

// Route to get a client token for PayPal
router.post('/get_client_token', getClientToken);

export default router;
