const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

const addComment = asyncHandler(async (req, res) => {
    const { content, post_id } = req.body;
    const user_id = req.user.id;

    if (!content || !post_id) {
        res.status(400).send('Content and post ID are required');
        return;
    }

    const commentData = {
        content,
        user_id,
        post_id,
        publish_time: new Date()  
    };

    await Comment.create(commentData);
    res.status(201).send('Comment added successfully');
});

const updateComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;

    const commentData = {
        content,
        publish_time: new Date() 
    };

    await Comment.update(commentId, commentData);
    res.status(200).send('Comment updated successfully');
});

const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    await Comment.delete(commentId);
    res.status(200).send('Comment deleted successfully');
});

const getCommentsByPost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const comments = await Comment.findByPostId(postId);
    res.status(200).json(comments);
});

module.exports = { addComment, updateComment, deleteComment, getCommentsByPost };
