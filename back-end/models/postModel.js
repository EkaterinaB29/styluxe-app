import db from '../config/db.js';

const Post = {
    create: async (postData) => {
        const sql = `INSERT INTO Post (content, user_id, publish_time, image_url, tags) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                postData.content,
                postData.user_id,
                postData.publish_time,
                postData.image_url,
                postData.tags
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
    },
    like: async (postId) => {
        const sql = `UPDATE Post SET likes = likes + 1 WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [postId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findByUserId: async (userId) => {
        const sql = `SELECT * FROM Post WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    search: async (query) => {
        const sql = `SELECT * FROM Post WHERE MATCH(content) AGAINST(? IN NATURAL LANGUAGE MODE)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [query], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    findByTag: async (tag) => {
        const sql = `SELECT * FROM Post WHERE tags LIKE ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [`%${tag}%`], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
};

export default Post;
