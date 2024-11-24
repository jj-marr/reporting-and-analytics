const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @swagger
 * /api/analytics/ticket-resolution:
 *   get:
 *     summary: Get ticket resolution times statistics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved ticket resolution stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     fast:
 *                       type: number
 *                     slow:
 *                       type: number
 *       500:
 *         description: Server error occurred
 */
router.get('/ticket-resolution', analyticsController.getTicketResolutionTimes);

/**
 * @swagger
 * /api/analytics/satisfaction:
 *   get:
 *     summary: Get user satisfaction statistics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved satisfaction stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     'Very Satisfied':
 *                       type: number
 *                     'Satisfied':
 *                       type: number
 *                     'Neutral':
 *                       type: number
 *                     'Dissatisfied':
 *                       type: number
 */
router.get('/satisfaction', analyticsController.getUserSatisfaction);

/**
 * @swagger
 * /api/analytics/feedback-trends:
 *   get:
 *     summary: Get feedback trends analysis
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved feedback trends
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     satisfaction:
 *                       type: object
 *                     productSatisfaction:
 *                       type: object
 */
router.get('/feedback-trends', analyticsController.getFeedbackTrends);

/**
 * @swagger
 * /api/analytics/participation-rates:
 *   get:
 *     summary: Get participation rates in different activities
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved participation rates
 */
router.get('/participation-rates', analyticsController.getParticipationRates);

/**
 * @swagger
 * /api/analytics/popular-rewards:
 *   get:
 *     summary: Get most popular rewards
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved popular rewards
 */
router.get('/popular-rewards', analyticsController.getPopularRewards);

/**
 * @swagger
 * /api/analytics/points/{customerId}:
 *   get:
 *     summary: Get points history for specific customer
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer email
 *     responses:
 *       200:
 *         description: Successfully retrieved customer points
 *       404:
 *         description: Customer not found
 */
router.get('/points/:customerId', analyticsController.getCustomerPoints);

/**
 * @swagger
 * /api/analytics/rewards/{customerId}:
 *   get:
 *     summary: Get rewards history for specific customer
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer email
 *     responses:
 *       200:
 *         description: Successfully retrieved customer rewards
 *       404:
 *         description: Customer not found
 */
router.get('/rewards/:customerId', analyticsController.getCustomerRewards);

/**
 * @swagger
 * /api/analytics/demographics:
 *   get:
 *     summary: Get user demographics (average age and gender counts)
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved demographics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     averageAge:
 *                       type: number
 *                     gender:
 *                       type: object
 *                       additionalProperties:
 *                         type: integer
 *       500:
 *         description: Server error
 */
router.get('/demographics', analyticsController.getUserDemographics);

module.exports = router;
