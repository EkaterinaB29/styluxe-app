const db = require('../config/db');

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
    // Update and delete methods omitted for brevity
};

module.exports = Portfolio;
