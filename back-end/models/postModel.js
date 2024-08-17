import db from '../config/db.js';

const Post = {
    create: async (postData) => {
        const sql = `INSERT INTO Post (content, user_id, publish_time, image_url, tags) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                postData.title, 
                postData.content,
                postData.user_id,
                postData.publish_time,
                postData.image_url,
                JSON.stringify(postData.tags) // Store tags as JSON string
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    },
    update: async (postId, postData) => {
        const sql = `UPDATE Post SET content = ?, publish_time = ?, tags = ? WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
               
                postData.content,
                postData.publish_time,
                JSON.stringify(postData.tags), // Store tags as JSON string
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
    findAll: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT p.*, u.first_name, u.last_name
                FROM Post p
                JOIN User u ON p.user_id = u.user_id
                ORDER BY p.publish_time DESC`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                results.forEach(post => {
                    post.tags = JSON.parse(post.tags); // Parse tags from JSON string
                });
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
    findById: async (postId) => {
        const sql = `SELECT * FROM Post WHERE post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [postId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length > 0) {
                    result[0].tags = JSON.parse(result[0].tags); // Parse tags from JSON string
                }
                resolve(result[0]);
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
                results.forEach(post => {
                    post.tags = JSON.parse(post.tags); // Parse tags from JSON string
                });
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
                results.forEach(post => {
                    post.tags = JSON.parse(post.tags); // Parse tags from JSON string
                });
                resolve(results);
            });
        });
    },
};

export default Post;
