import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';

// Add a comment

const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;
    const user_id = req.user.id;

    if (!content || !postId) {
        res.status(400).send('Content and post ID are required');
        return;
    }

    const commentData = {
        content: content,
        user_id,
        post_id: postId,
        publish_time: new Date(),
        parent_id: null
    };

    await Comment.create(commentData);
    res.status(201).send('Comment added successfully');
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
   
    const commentData = {
        content,
        publish_time: new Date()
    };

    await Comment.update(commentId, commentData);
    res.status(200).send('Comment updated successfully');
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
      
    await Comment.delete(commentId);
    res.status(200).send('Comment deleted successfully');
});

// Like a comment
const likeComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;

    await Comment.like(commentId);
    res.status(200).send('Comment liked successfully');
});

// Reply to a comment
const replyOnComment = asyncHandler(async (req, res) => {
    const { content, post_id, parent_id } = req.body;
    const user_id = req.user.id;
    
    if (!content || !post_id || !parent_id) {
        res.status(400).send('Content, post ID, and parent ID are required');
        return;
    }
    
    const commentData = {
        content,
        user_id,
        post_id,
        publish_time: new Date(),
        parent_id 
    };

    await Comment.reply(commentData);
    res.status(201).send('Reply added successfully');
});

export { createComment, updateComment, deleteComment, likeComment, replyOnComment };
