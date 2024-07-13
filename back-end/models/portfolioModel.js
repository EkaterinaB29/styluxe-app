const db = require('../config/db');

const Portfolio = {
    create: (portfolioData, callback) => {
        const sql = `INSERT INTO Portfolio (file_name, file_type, file_content, file_size, file_path, education_history, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            portfolioData.file_name,
            portfolioData.file_type,
            portfolioData.file_content,
            portfolioData.file_size,
            portfolioData.file_path,
            portfolioData.education_history,
            portfolioData.user_id
        ], callback);
    },
    update: (portfolioId, portfolioData, callback) => {
        const sql = `UPDATE Portfolio SET file_name = ?, file_type = ?, file_content = ?, file_size = ?, file_path = ?, education_history = ? WHERE portfolio_id = ?`;
        db.query(sql, [
            portfolioData.file_name,
            portfolioData.file_type,
            portfolioData.file_content,
            portfolioData.file_size,
            portfolioData.file_path,
            portfolioData.education_history,
            portfolioId
        ], callback);
    },
    delete: (portfolioId, callback) => {
        const sql = `DELETE FROM Portfolio WHERE portfolio_id = ?`;
        db.query(sql, [portfolioId], callback);
    }
};

module.exports = Portfolio;
