import db from '../config/db.js';

const Order = {
    create: async (orderData) => {
        const sql = `INSERT INTO Orders (timestamp, status, user_id_from, user_id_to, amount, currency, paypal_order_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                orderData.timestamp || new Date(), 
                orderData.status || 'PENDING', 
                orderData.user_id_from || null, 
                orderData.user_id_to || null,   
                orderData.amount || 0,          
                orderData.currency || 'EUR',   
                orderData.paypal_order_id || null 
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
            db.query(sql, [paypal_order_id || null, id], (err, result) => { // Ensure paypal_order_id is handled properly
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
            db.query(sql, [status || 'PENDING', paypal_order_id], (err, result) => { // Default status if not provided
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

export default Order;
