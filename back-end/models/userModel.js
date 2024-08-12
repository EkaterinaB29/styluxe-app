import db from '../config/db.js';

const User = {
    create: (userData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO User (first_name, last_name, location, birthday, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(query, [
                userData.first_name,
                userData.last_name,
                userData.location,
                userData.birthday,
                userData.email,
                userData.password,
                userData.role,
                userData.profile_picture || null
            ], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM User WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM User WHERE user_id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    update: (userId, userData) => {
        return new Promise((resolve, reject) => {
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

            db.query(query, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    delete: (userId) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM User WHERE user_id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    search: (query) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM User WHERE MATCH(first_name, last_name, location) AGAINST(? IN NATURAL LANGUAGE MODE)';
            db.query(sql, [query], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    updatePassword: (userId, hashedPassword) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE User SET password = ? WHERE user_id = ?';
            db.query(query, [hashedPassword, userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    findByRole: (role) => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT user_id, first_name, last_name, email, location FROM User WHERE role = ?';
          db.query(query, [role], (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        });
      },
};

export default User;
