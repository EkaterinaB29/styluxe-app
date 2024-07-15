const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');

const createTransaction = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const { card_id_from, card_id_to } = req.params;
    const transactionData = { amount, card_id_from, card_id_to };
    const result = await Transaction.create(transactionData);
    res.status(201).json({ message: 'Transaction created successfully', result });
});

const getTransactionStatus = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const transaction = await Transaction.getById(transactionId);
    if (transaction) {
        res.status(200).json({ status: transaction.status });
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

const updateTransactionStatus = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const { status } = req.body;
    const result = await Transaction.updateStatus(transactionId, status);
    res.status(200).json({ message: 'Transaction status updated successfully', result });
});

const getTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const transaction = await Transaction.getById(transactionId);
    if (transaction) {
        res.status(200).json(transaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    await Transaction.delete(transactionId);
    res.status(200).json({ message: 'Transaction deleted successfully' });
});

module.exports = {
    createTransaction,
    getTransactionStatus,
    updateTransactionStatus,
    getTransaction,
    getTransactions,
    deleteTransaction
};
