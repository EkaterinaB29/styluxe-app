const db = require('../config/db');

const CreditCard = {
    create: async (cardData) => {
        const sql = `INSERT INTO CreditCard (cardholders_name, card_number, cvv, expiration_date, user_id, status) VALUES (?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                cardData.cardholders_name,
                cardData.card_number,
                cardData.cvv,
                cardData.expiration_date,
                cardData.user_id,
                'ACTIVE'
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    getById: async (cardId) => {
        const sql = `SELECT * FROM CreditCard WHERE card_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [cardId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    getStatusById: async (cardId) => {
        const sql = `SELECT status FROM CreditCard WHERE card_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [cardId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },
    removeById: async (cardId) => {
        const sql = `DELETE FROM CreditCard WHERE card_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [cardId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = CreditCard;
