const express = require('express');
const { addMessage, deleteMessage, getMessageById, getMessagesByUser, likeMessage, replyToMessage, markMessageAsSeen } = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, addMessage);
router.delete('/:id', authenticateToken, deleteMessage);
router.get('/:id', authenticateToken, getMessageById);
router.get('/user/:userId', authenticateToken, getMessagesByUser);
router.post('/like/:id', authenticateToken, likeMessage);
router.post('/reply', authenticateToken, replyToMessage);
router.post('/seen/:id', authenticateToken, markMessageAsSeen);

module.exports = router;
