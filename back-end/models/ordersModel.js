import db from '../config/db.js';

const Order = {
    create: async (orderData) => {
        const sql = `INSERT INTO Orders (timestamp, status, user_id_to, amount, currency) VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                orderData.timestamp,
                orderData.status,
                /*orderData.user_id_from,*/
                orderData.user_id_to,
                orderData.amount,
                orderData.currency
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    },
    updatePayPalOrderId: async (id, paypal_order_id) => {
        const sql = `UPDATE Orders SET paypal_order_id = ? WHERE order_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [paypal_order_id, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updateStatusByPayPalOrderId: async (paypal_order_id, status) => {
        const sql = `UPDATE Orders SET status = ? WHERE paypal_order_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [status, paypal_order_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

export default Order;
