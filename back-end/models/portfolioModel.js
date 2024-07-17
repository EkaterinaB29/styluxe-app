import db from '../config/db.js';

const Portfolio = {
    create: (portfolioData) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Portfolio (file_name, file_type, file_size, file_path, education_history, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
            console.log('SQL Query:', sql);
            console.log('Portfolio Data:', portfolioData);
            db.query(sql, [
                portfolioData.file_name,
                portfolioData.file_type,
                portfolioData.file_size,
                portfolioData.file_path,
                portfolioData.education_history,
                portfolioData.user_id
            ], (err, result) => {
                if (err) {
                    console.error('Error in create method:', err);
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
    update: (portfolioId, portfolioData) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Portfolio SET file_name = ?, file_type = ?, file_size = ?, file_path = ?, education_history = ? WHERE portfolio_id = ?`;
            console.log('SQL Query:', sql);
            console.log('Portfolio ID:', portfolioId);
            console.log('Portfolio Data:', portfolioData);
            db.query(sql, [
                portfolioData.file_name,
                portfolioData.file_type,
                portfolioData.file_size,
                portfolioData.file_path,
                portfolioData.education_history,
                portfolioId
            ], (err, result) => {
                if (err) {
                    console.error('Error in update method:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: (portfolioId) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Portfolio WHERE portfolio_id = ?`;
            console.log('SQL Query:', sql);
            console.log('Portfolio ID:', portfolioId);
            db.query(sql, [portfolioId], (err, result) => {
                if (err) {
                    console.error('Error in delete method:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

export default Portfolio;
