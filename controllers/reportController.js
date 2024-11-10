const Report = require('../models/Report');

const _uwu_getReports = async (req, res) => {
    try {
        const { startDate, endDate, customerId } = req.query;
        let owo_query = {};

        if (startDate && endDate) {
            owo_query.generatedAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (customerId) {
            owo_query['metrics.customerMetrics.customerId'] = customerId;
        }

        const uwu_reports = await Report.find(owo_query);

        if (!uwu_reports.length) {
            return res.status(404).json({
                message: 'Gomen ne~ No reports found (╥﹏╥)'
            });
        }

        res.json({
            message: 'Yatta! Here are your reports ٩(◕‿◕｡)۶',
            data: uwu_reports
        });

    } catch (error) {
        console.error('OwO we had an oopsie!', error);
        res.status(500).json({
            message: 'Sumimasen! Something went wrong >_<',
            error: error.message
        });
    }
};

const _uwu_getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;
        const uwu_report = await Report.findOne({ reportId });

        if (!uwu_report) {
            return res.status(404).json({
                message: 'Gomen nasai! Report not found (╥﹏╥)'
            });
        }

        res.json({
            message: 'Sugoi! Here\'s your report ⭐',
            data: uwu_report
        });

    } catch (error) {
        console.error('OwO we had an oopsie!', error);
        res.status(500).json({
            message: 'Sumimasen! Something went wrong >_<',
            error: error.message
        });
    }
};

module.exports = {
    _uwu_getReports,
    _uwu_getReportById
};
