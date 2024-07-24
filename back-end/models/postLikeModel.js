import db from '../config/db.js';

const PostLike = {
    create: async ({ user_id, post_id }) => {
        const sql = `INSERT INTO PostLikes (user_id, post_id) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [user_id, post_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    findByUserAndPost: async (user_id, post_id) => {
        const sql = `SELECT * FROM PostLikes WHERE user_id = ? AND post_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [user_id, post_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    }
};

export default PostLike;
