const express = require('express');
const {addCreditCard, getCreditCard, getCreditCardStatus, removeCreditCard } = require('../controllers/creditCardController');

const router = express.Router();

router.post('/', addCreditCard);
router.get('/:id', getCreditCard);
router.get('/status/:id', getCreditCardStatus);
router.delete('/:id', removeCreditCard);

module.exports = router;
