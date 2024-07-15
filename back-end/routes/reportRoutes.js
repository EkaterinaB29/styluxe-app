const express = require('express');
const { addReport, deleteReport, getReportsByReporter, getReportsByReported } = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, addReport);
router.delete('/:id', authenticateToken, deleteReport);
router.get('/reporter/:reporterId', authenticateToken, getReportsByReporter);
router.get('/reported/:reportedId', authenticateToken, getReportsByReported);

module.exports = router;
