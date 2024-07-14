const db = require('../config/db');

const Post = {
    create: async (postData) => {
        const sql = `INSERT INTO Post (content, user_id, publish_time) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                postData.content,
                postData.user_id,
                postData.publish_time
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    update: async (postId, postData) => {
        const sql = `UPDATE Post SET content = ?, publish_time = ? WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                postData.content,
                postData.publish_time,
                postId
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: async (postId) => {
        const sql = `DELETE FROM Post WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [postId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findById: async (postId) => {
        const sql = `SELECT * FROM Post WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [postId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    findAll: async () => {
        const sql = `SELECT * FROM Post`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};

module.exports = Post;
