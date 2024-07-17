import express from 'express';
import { createPayPalOrder, capturePayPalOrder } from '../controllers/ordersController.js';

const router = express.Router();

router.post('/create-order', createPayPalOrder);
router.post('/capture-order/:orderID', capturePayPalOrder);

export default router;
