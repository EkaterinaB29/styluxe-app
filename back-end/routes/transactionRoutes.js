const express = require('express');
const {
    createTransaction,
    getTransactionStatus,
    updateTransactionStatus,
    getTransaction,
    getTransactions,
    deleteTransaction
} = require('../controllers/transactionController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:card_id_from/:card_id_to', authenticateToken, createTransaction);
router.get('/:id', authenticateToken, getTransaction);
router.get('/status/:id', authenticateToken, getTransactionStatus);
router.put('/status/:id', authenticateToken, updateTransactionStatus);
router.get('/', authenticateToken, getTransactions);
router.delete('/:id', authenticateToken, deleteTransaction);

module.exports = router;
