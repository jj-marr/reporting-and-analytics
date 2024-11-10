const express = require('express');
const router = express.Router();
const { _uwu_getReports, _uwu_getReportById } = require('../controllers/reportController');

router.get('/', _uwu_getReports);
router.get('/:reportId', _uwu_getReportById);

module.exports = router;
