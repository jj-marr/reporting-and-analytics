// routes/analytics.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/ticket-resolution', analyticsController.getTicketResolutionTimes);
router.get('/satisfaction', analyticsController.getUserSatisfaction);
router.get('/feedback-trends', analyticsController.getFeedbackTrends);
router.get('/participation-rates', analyticsController.getParticipationRates);
router.get('/popular-rewards', analyticsController.getPopularRewards);
router.get('/points/:customerId', analyticsController.getCustomerPoints);
router.get('/rewards/:customerId', analyticsController.getCustomerRewards);

module.exports = router;
