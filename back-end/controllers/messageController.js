import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';

// Send a message
const addMessage = asyncHandler(async (req, res) => {
    const { content, user_id_to, parent_id } = req.body;
    const user_id_from = req.user.id;

    if (!content || !user_id_to) {
        return res.status(400).send('Content and recipient ID are required');
    }

    const messageData = {
        content,
        user_id_from,
        user_id_to,
        publish_time: new Date(),
        parent_id: parent_id || null
    };

    await Message.create(messageData);
    res.status(201).send('Message sent successfully');
});

const deleteMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.id;

    await Message.delete(messageId);
    res.status(200).send('Message deleted successfully');
});

const getMessageById = asyncHandler(async (req, res) => {
    const messageId = req.params.id;

    const message = await Message.findById(messageId);
    res.status(200).json(message);
});

const getMessagesByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const messages = await Message.findByUser(userId);
    res.status(200).json(messages);
});

const likeMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.id;

    await Message.like(messageId);
    res.status(200).send('Message liked successfully');
});

const replyToMessage = asyncHandler(async (req, res) => {
    const { content, user_id_to, parent_id } = req.body;
    const user_id_from = req.user.id;

    if (!content || !user_id_to || !parent_id) {
        return res.status(400).send('Content, recipient ID, and parent message ID are required');
    }

    const messageData = {
        content,
        user_id_from,
        user_id_to,
        publish_time: new Date(),
        parent_id
    };

    await Message.reply(messageData);
    res.status(201).send('Reply sent successfully');
});

const markMessageAsSeen = asyncHandler(async (req, res) => {
    const messageId = req.params.id;

    await Message.markAsSeen(messageId);
    res.status(200).send('Message marked as seen');
});

export { addMessage, deleteMessage, getMessageById, getMessagesByUser, likeMessage, replyToMessage, markMessageAsSeen };
