const asyncHandler = require('express-async-handler');
const Report = require('../models/reportModel');

const addReport = asyncHandler(async (req, res) => {
    const { content, reported_id } = req.body;
    const reporter_id = req.user.id;

    if ( !content || !reported_id) {
        return res.status(400).send('Content, and reported_id are required');
    }

    const reportData = {
        content,
        reporter_id,
        reported_id,
        publish_time: new Date()
    };

    await Report.create(reportData);
    res.status(201).send('Report added successfully');
});
// Same as withdrawlReport()
const deleteReport = asyncHandler(async (req, res) => {
    const reportId = req.params.id;

    await Report.delete(reportId);
    res.status(200).send('Report deleted successfully');
});

// maybe will be used later
const getReportsByReporter = asyncHandler(async (req, res) => {
    const reporterId = req.params.reporterId;

    const reports = await Report.findByReporterId(reporterId);
    res.status(200).json(reports);
});

const getReportsByReported = asyncHandler(async (req, res) => {
    const reportedId = req.params.reportedId;

    const reports = await Report.findByReportedId(reportedId);
    res.status(200).json(reports);
});

module.exports = { addReport, deleteReport, getReportsByReporter, getReportsByReported };
