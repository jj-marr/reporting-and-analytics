// controllers/analyticsController.js
const LoyaltyClient = require('../models/LoyaltyClient');
const Feedback = require('../models/Feedback');
const Survey = require('../models/Survey');

const analyticsController = {
    // Get ticket resolution times uwu
    getTicketResolutionTimes: async (req, res) => {
        try {
            const feedbacks = await Feedback.find();
            // Calculate average satisfaction based on experience descriptions
            const resolutionAnalysis = feedbacks.reduce((acc, feedback) => {
                const resolution = feedback.satisfaction === 'Satisfied' || 
                                 feedback.satisfaction === 'Very Satisfied' ? 'fast' : 'slow';
                acc[resolution] = (acc[resolution] || 0) + 1;
                return acc;
            }, {});

            res.json({ success: true, data: resolutionAnalysis });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get user satisfaction owo
    getUserSatisfaction: async (req, res) => {
        try {
            const feedbacks = await Feedback.find();
            const satisfactionStats = feedbacks.reduce((acc, feedback) => {
                acc[feedback.satisfaction] = (acc[feedback.satisfaction] || 0) + 1;
                return acc;
            }, {});

            res.json({ success: true, data: satisfactionStats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get feedback trends uwu
    getFeedbackTrends: async (req, res) => {
        try {
            const [feedbacks, surveys] = await Promise.all([
                Feedback.find(),
                Survey.find()
            ]);

            const trends = {
                satisfaction: {
                    positive: feedbacks.filter(f => 
                        f.satisfaction === 'Satisfied' || f.satisfaction === 'Very Satisfied').length,
                    negative: feedbacks.filter(f => 
                        f.satisfaction === 'Dissatisfied').length
                },
                productSatisfaction: {
                    positive: surveys.filter(s => 
                        s.satisfactionProd === 'Satisfied' || s.satisfactionProd === 'Very Satisfied').length,
                    negative: surveys.filter(s => 
                        s.satisfactionProd === 'Dissatisfied').length
                }
            };

            res.json({ success: true, data: trends });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get participation rates desu~
    getParticipationRates: async (req, res) => {
        try {
            const clients = await LoyaltyClient.find();
            const participationStats = clients.reduce((acc, client) => {
                client.activities.forEach(activity => {
                    acc[activity.type] = (acc[activity.type] || 0) + 1;
                });
                return acc;
            }, {});

            res.json({ success: true, data: participationStats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get popular rewards ✨
    getPopularRewards: async (req, res) => {
        try {
            const clients = await LoyaltyClient.find();
            const rewardStats = clients.reduce((acc, client) => {
                client.rewards.forEach(reward => {
                    acc[reward.description] = (acc[reward.description] || 0) + 1;
                });
                return acc;
            }, {});

            res.json({ success: true, data: rewardStats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get points for specific customer uwu
    getCustomerPoints: async (req, res) => {
        try {
            const client = await LoyaltyClient.findOne({ client_id: req.params.customerId });
            if (!client) {
                return res.status(404).json({ success: false, message: 'Customer not found desu~' });
            }

            const pointsHistory = {
                currentPoints: client.points,
                activities: client.activities.map(a => ({
                    type: a.type,
                    points: a.points_earned,
                    date: a.date
                }))
            };

            res.json({ success: true, data: pointsHistory });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get rewards for specific customer owo
    getCustomerRewards: async (req, res) => {
        try {
            const client = await LoyaltyClient.findOne({ client_id: req.params.customerId });
            if (!client) {
                return res.status(404).json({ success: false, message: 'Customer not found desu~' });
            }

            res.json({ success: true, data: client.rewards });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = analyticsController;
