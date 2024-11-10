const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    },
    metrics: {
        ticketResolution: {
            averageResolutionTime: Number,
            resolutionTimeDistribution: [{
                timeRange: String,
                count: Number
            }]
        },
        userSatisfaction: {
            averageRating: {
                type: Number,
                min: 0,
                max: 5
            },
            ratingDistribution: {
                type: Map,
                of: Number
            }
        },
        feedbackTrends: [{
            category: String,
            sentiment: {
                type: String,
                enum: ['positive', 'neutral', 'negative']
            },
            frequency: Number
        }],
        participationMetrics: {
            totalParticipants: Number,
            participationRate: Number,
            activeUsersPercentage: Number
        },
        rewardsAnalytics: {
            popularRewards: [{
                rewardId: String,
                rewardName: String,
                redemptionCount: Number
            }]
        },
        customerMetrics: [{
            customerId: String,
            pointsEarned: Number,
            rewardsRedeemed: [{
                rewardId: String,
                rewardName: String,
                pointsSpent: Number,
                redeemedAt: Date
            }]
        }]
    }
});

module.exports = mongoose.model('Report', reportSchema);
