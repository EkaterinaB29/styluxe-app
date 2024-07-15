const db = require('../config/db');

const Message = {
    create: async (messageData) => {
        const sql = `INSERT INTO Message (content, user_id_from, user_id_to, publish_time, parent_id) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                messageData.content,
                messageData.user_id_from,
                messageData.user_id_to,
                messageData.publish_time,
                messageData.parent_id
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: async (messageId) => {
        const sql = `DELETE FROM Message WHERE message_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [messageId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findById: async (messageId) => {
        const sql = `SELECT * FROM Message WHERE message_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [messageId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    findByUser: async (userId) => {
        const sql = `SELECT * FROM Message WHERE user_id_from = ? OR user_id_to = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [userId, userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    like: async (messageId) => {
        const sql = `UPDATE Message SET likes = likes + 1 WHERE message_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [messageId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    markAsSeen: async (messageId) => {
        const sql = `UPDATE Message SET seen = TRUE WHERE message_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [messageId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    reply: async (messageData) => {
        const sql = `INSERT INTO Message (content, user_id_from, user_id_to, publish_time, parent_id) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                messageData.content,
                messageData.user_id_from,
                messageData.user_id_to,
                messageData.publish_time,
                messageData.parent_id
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = Message;
