import db from '../config/db.js';

const Order = {
    create: (orderData) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Order (order_id, user_id_from, user_id_to, amount, status, timestamp, currency) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db.query(sql, [
                orderData.order_id,
                orderData.user_id_from,
                orderData.user_id_to,
                orderData.amount,
                orderData.status,
                orderData.timestamp,
                orderData.currency
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updateStatus: (orderId, status) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Order SET status = ? WHERE order_id = ?`;
            db.query(sql, [status, orderId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    getById: (orderId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Order WHERE order_id = ?`;
            db.query(sql, [orderId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    }
};

export default Order;
