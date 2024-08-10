import db from '../config/db.js';

const Portfolio = {
    create: (portfolioData) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Portfolio (file_name, file_type, file_size, file_path, education_history, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(sql, [
                portfolioData.file_name,
                portfolioData.file_type,
                portfolioData.file_size,
                portfolioData.file_path,
                portfolioData.education_history,
                portfolioData.user_id
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findById: (portfolioId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Portfolio WHERE portfolio_id = ?`;
            db.query(sql, [portfolioId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Portfolio WHERE user_id = ?`;
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log('No portfolio found for user ID:', userId);
                    return resolve([]); // Return an empty array if no portfolio is found
                }
                resolve(results);
            });
        });
    },
    
    update: (portfolioId, portfolioData) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Portfolio SET file_name = ?, file_type = ?, file_size = ?, file_path = ?, education_history = ? WHERE portfolio_id = ?`;
            db.query(sql, [
                portfolioData.file_name,
                portfolioData.file_type,
                portfolioData.file_size,
                portfolioData.file_path,
                portfolioData.education_history,
                portfolioId
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updateByUserId: (userId, portfolioData) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Portfolio SET ? WHERE user_id = ?`;
            db.query(sql, [portfolioData, userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    delete: (portfolioId) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Portfolio WHERE portfolio_id = ?`;
            db.query(sql, [portfolioId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

export default Portfolio;
