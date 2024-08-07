import db from '../config/db.js';

const Review = {
    create: (reviewData) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Review (quality_of_work, timeliness, reliability, satisfaction, publish_time, user_id, portfolio_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(sql, [
                reviewData.quality_of_work,
                reviewData.timeliness,
                reviewData.reliability,
                reviewData.satisfaction,
                reviewData.publish_time,
                reviewData.user_id,
                reviewData.portfolio_id
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    update: (reviewId, reviewData) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Review SET quality_of_work = ?, timeliness = ?, reliability = ?, satisfaction = ?, publish_time = ? WHERE review_id = ?`;
            db.query(sql, [
                reviewData.quality_of_work,
                reviewData.timeliness,
                reviewData.reliability,
                reviewData.satisfaction,
                reviewData.publish_time,
                reviewId
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: (reviewId) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Review WHERE review_id = ?`;
            db.query(sql, [reviewId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findByPortfolioId: (portfolioId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Review WHERE portfolio_id = ?`;
            db.query(sql, [portfolioId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Review WHERE user_id = ?`;
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};

export default Review;
