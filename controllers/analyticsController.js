// controllers/analyticsController.js
const axios = require('axios');

const LoyaltyClient = require('../models/LoyaltyClient');
const Feedback = require('../models/Feedback');
const Survey = require('../models/Survey');
const User = require('../models/User');
const NewUser = require('../models/NewUser')

const analyticsController = {
    // Get all users data function owo
    async getAllUsers() {
        const response = await axios.get(process.env.USER_API);
        return response.data.user;
    },

    async getUserDemographics(req, res) {
        try {
            const users = await NewUser.find({}, 'age gender'); // Use NewUser model here! 💖
            const demographics = { gender: {} };
            let totalAge = 0;

            // Process data like analyzing enemy intel! 🧐
            users.forEach(user => {
                totalAge += user.age;
                demographics.gender[user.gender] = (demographics.gender[user.gender] || 0) + 1;
            });

            demographics.averageAge = users.length > 0 ? totalAge / users.length : 0; // Calculate average age! 🧮

            res.json({ success: true, data: demographics }); // Send the data! 💌
        } catch (error) {
            console.error("Error fetching demographics: (╥﹏╥)", error);
            res.status(500).json({ success: false, error: error.message });
        }
    },

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
            const users = await analyticsController.getAllUsers();
            const sugoi_rewards = users.reduce((desu_acc, user_chan) => {
                const redeemTransactions = Object.values(user_chan.transaction_history)
                    .filter(trans => trans.transaction_type === 'redeem');

                redeemTransactions.forEach(trans_kun => {
                    desu_acc[trans_kun.productName] = (desu_acc[trans_kun.productName] || 0) + 1;
                });
                return desu_acc;
            }, {});

            res.json({ success: true, data: sugoi_rewards });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get points for specific customer uwu
    getCustomerPoints: async (req, res) => {
        try {
            const users = await analyticsController.getAllUsers();
            const user_chan = users.find(u => u.email === req.params.customerId);

            if (!user_chan) {
                return res.status(404).json({ success: false, message: 'Customer-chan not found >_<' });
            }

            const kawaii_points = {
                currentPoints: user_chan.points_balance,
                activities: Object.values(user_chan.transaction_history).map(trans_kun => ({
                    type: trans_kun.transaction_type,
                    points: trans_kun.points_change,
                    date: trans_kun.transaction_date
                }))
            };

            res.json({ success: true, data: kawaii_points });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get rewards for specific customer owo
    getCustomerRewards: async (req, res) => {
        try {
            const users = await analyticsController.getAllUsers();
            const user_chan = users.find(u => u.email === req.params.customerId);

            if (!user_chan) {
                return res.status(404).json({ success: false, message: 'Customer-chan not found >_<' });
            }

            const sugoi_rewards = Object.values(user_chan.transaction_history)
                .filter(trans => trans.transaction_type === 'redeem')
                .map(trans_kun => ({
                    description: trans_kun.productName,
                    date: trans_kun.transaction_date,
                    points: Math.abs(trans_kun.points_change)
                }));

            res.json({ success: true, data: sugoi_rewards });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = analyticsController;
