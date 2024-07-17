import express from 'express';
import { createPayPalOrder, capturePayPalOrder } from '../controllers/ordersController.js';
const router = express.Router();

router.post('/', createPayPalOrder);
router.post('/:orderId/capture', capturePayPalOrder);

export default router;
