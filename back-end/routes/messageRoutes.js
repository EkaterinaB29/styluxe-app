import express from 'express';
import { 
    addMessage, 
    deleteMessage, 
    getMessageById, 
    getMessagesByUser, 
    likeMessage, 
    replyToMessage, 
    markMessageAsSeen 
} from '../controllers/messageController.js';
import  authenticateToken  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, addMessage);
router.delete('/:id', authenticateToken, deleteMessage);
router.get('/:id', authenticateToken, getMessageById);
router.get('/user/:userId', authenticateToken, getMessagesByUser);
router.post('/like/:id', authenticateToken, likeMessage);
router.post('/reply', authenticateToken, replyToMessage);
router.post('/seen/:id', authenticateToken, markMessageAsSeen);

export default router;
