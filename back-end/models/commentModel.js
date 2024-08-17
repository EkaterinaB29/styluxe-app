import db from '../config/db.js';

const Comment = {
    create: async (commentData) => {
        const sql = `INSERT INTO Comment (content, user_id, post_id, publish_time, parent_id) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                commentData.content,
                commentData.user_id,
                commentData.post_id,
                commentData.publish_time,
                commentData.parent_id || null
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
    findByPostId: (postId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT c.*, u.first_name, u.last_name 
                FROM Comment c
                JOIN User u ON c.user_id = u.user_id
                WHERE c.post_id = ?`;
            db.query(query, [postId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    
    },
    like: async (commentId) => {
        const sql = `UPDATE Comment SET likes = likes + 1 WHERE comment_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [commentId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    reply: async (commentData) => {
        const sql = `INSERT INTO Comment (content, user_id, post_id, publish_time, parent_id) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                commentData.content,
                commentData.user_id,
                commentData.post_id,
                commentData.publish_time,
                commentData.parent_id
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

export default Comment;
