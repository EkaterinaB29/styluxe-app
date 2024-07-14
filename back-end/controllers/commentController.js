const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

// Building the nested comment tree structure
const buildCommentTree = (comments, parentId = null) => {
    let commentTree = [];
    comments.forEach(comment => {
        if (comment.parent_id === parentId) {
            let children = buildCommentTree(comments, comment.comment_id);
            if (children.length) {
                comment.replies = children;
            } else {
                comment.replies = [];
            }
            commentTree.push(comment);
        }
    });
    return commentTree;
};

// Get comments by post ID to build the tree
const getCommentsByPost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const comments = await Comment.findByPostId(postId);
    const commentTree = buildCommentTree(comments);
    res.status(200).json({ comments: commentTree });
});

// Add a comment
const addComment = asyncHandler(async (req, res) => {
    const { content, post_id, parent_id } = req.body;
    const user_id = req.user.id;
    //console.log(parent_id);

    if (!content || !post_id) {
        res.status(400).send('Content and post ID are required');
        return;
    }

    const commentData = {
        content,
        user_id,
        post_id,
        publish_time: new Date(),
        parent_id: parent_id || null
    };

    await Comment.create(commentData);
    res.status(201).send('Comment added successfully');
});

// Update a comment
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

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    await Comment.delete(commentId);
    res.status(200).send('Comment deleted successfully');
});

// Like a comment
const likeComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;

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

module.exports = { addComment, updateComment, deleteComment, getCommentsByPost, likeComment, replyOnComment };
