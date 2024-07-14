const db = require('../config/db');

const Comment = {
    create: async (commentData) => {
        const sql = `INSERT INTO Comment (content, user_id, post_id, publish_time) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                commentData.content,
                commentData.user_id,
                commentData.post_id,
                commentData.publish_time
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    update: async (commentId, commentData) => {
        const sql = `UPDATE Comment SET content = ?, publish_time = ? WHERE comment_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                commentData.content,
                commentData.publish_time,
                commentId
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: async (commentId) => {
        const sql = `DELETE FROM Comment WHERE comment_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [commentId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findByPostId: async (postId) => {
        const sql = `SELECT * FROM Comment WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [postId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};

module.exports = Comment;
