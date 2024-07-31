import db from '../config/db.js'; 

const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO User (first_name, last_name, location, birthday, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            userData.firstName,
            userData.lastName,
            userData.location,
            userData.birthday,
            userData.email,
            userData.password,
            userData.role,
            userData.profile_picture
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
        let query = 'UPDATE User SET';
        let params = [];
        
        Object.keys(userData).forEach((key, index) => {
            const columnName = key.replace(/([A-Z])/g, "_$1").toLowerCase();
            query += ` ${columnName} = ?`;
            if (index < Object.keys(userData).length - 1) {
                query += ',';
            }
            params.push(userData[key]);
        });
        
        query += ' WHERE user_id = ?';
        params.push(userId);
    
        db.query(query, params, callback);
    },
    
    delete: (userId, callback) => {
        const query = 'DELETE FROM User WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    search: (query, callback) => {
        const sql = 'SELECT * FROM User WHERE MATCH(first_name, last_name, location) AGAINST(? IN NATURAL LANGUAGE MODE)';
        db.query(sql, [query], callback);
    },
    updatePassword: (userId, hashedPassword, callback) => {
        const query = 'UPDATE User SET password = ? WHERE user_id = ?';
        db.query(query, [hashedPassword, userId], callback);
    },
};

export default User;
