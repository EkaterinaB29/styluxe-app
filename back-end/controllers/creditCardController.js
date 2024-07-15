const asyncHandler = require('express-async-handler');
const CreditCard = require('../models/creditCardModel');

const addCreditCard = asyncHandler(async (req, res) => {
    const cardData = req.body;
    const result = await CreditCard.create(cardData);
    res.status(201).json({ message: 'Credit card added successfully', result });
});

const getCreditCard = asyncHandler(async (req, res) => {
    const cardId = req.params.id;
    const card = await CreditCard.getById(cardId);
    res.status(200).json(card);
});

const getCreditCardStatus = asyncHandler(async (req, res) => {
    const cardId = req.params.id;
    const status = await CreditCard.getStatusById(cardId);
    res.status(200).json(status);
});

const removeCreditCard = asyncHandler(async (req, res) => {
    const cardId = req.params.id;
    await CreditCard.removeById(cardId);
    res.status(200).json({ message: 'Credit card removed successfully' });
});

module.exports = {
    addCreditCard,
    getCreditCard,
    getCreditCardStatus,
    removeCreditCard
};
