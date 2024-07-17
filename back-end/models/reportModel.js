import db from '../config/db.js';


const Report = {
    create: async (reportData) => {
        const sql = `INSERT INTO Report (content, reporter_id, reported_id, publish_time) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [
                reportData.content,
                reportData.reporter_id,
                reportData.reported_id,
                reportData.publish_time
            ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    delete: async (reportId) => {
        const sql = `DELETE FROM Report WHERE report_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [reportId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    findByReporterId: async (reporterId) => {
        const sql = `SELECT * FROM Report WHERE reporter_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [reporterId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    findByReportedId: async (reportedId) => {
        const sql = `SELECT * FROM Report WHERE reported_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [reportedId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};

export default Report;
