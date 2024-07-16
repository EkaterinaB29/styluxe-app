const db = require('../config/db');

const Transaction = {
    create: async (transactionData) => {
        const sql = `INSERT INTO Transaction (publish_time, amount, status, user_id_from, user_id_to) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                transactionData.publish_time,
                transactionData.amount,
                'PENDING',
                transactionData.user_id_from,
                transactionData.user_id_to
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    getById: async (transactionId) => {
        const sql = `SELECT * FROM Transaction WHERE transaction_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [transactionId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    getStatusById: async (transactionId) => {
        const sql = `SELECT status FROM Transaction WHERE transaction_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [transactionId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    updateStatus: async (transactionId, status) => {
        const sql = `UPDATE Transaction SET status = ? WHERE transaction_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [status, transactionId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findAll: async () => {
        const sql = `SELECT * FROM Transaction`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    removeById: async (transactionId) => {
        const sql = `DELETE FROM Transaction WHERE transaction_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [transactionId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = Transaction;
