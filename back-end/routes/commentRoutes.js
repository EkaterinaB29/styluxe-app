const express = require('express');
const { addComment, updateComment, deleteComment, getCommentsByPost, likeComment, replyOnComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Comment routes
router.post('/', authenticateToken, addComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);
router.get('/post/:postId', authenticateToken, getCommentsByPost);
router.post('/like/:id', authenticateToken, likeComment); 
router.post('/reply', authenticateToken, replyOnComment); 

module.exports = router;
