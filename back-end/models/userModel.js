const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO User (first_name, last_name, location, birthday, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            userData.firstName,
            userData.lastName,
            userData.location,
            userData.birthday,
            userData.email,
            userData.password,
            userData.role
        ], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM User WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM User WHERE user_id = ?';
        db.query(query, [id], callback);
    },
    update: (userId, userData, callback) => {
        const query = 'UPDATE User SET first_name = ?, last_name = ?, location = ?, birthday = ?, role = ? WHERE user_id = ?';
        db.query(query, [
            userData.firstName,
            userData.lastName,
            userData.location,
            userData.birthday,
            userData.role,
            userId
        ], callback);
    },
    delete: (userId, callback) => {
        const query = 'DELETE FROM User WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = User;
