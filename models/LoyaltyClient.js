const mongoose = require('mongoose');

const loyaltyActivitySchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    points_earned: { type: Number, required: true },
    date: { type: Date, required: true },
    activity_id: { type: String }
});

const rewardSchema = new mongoose.Schema({
    reward_id: { type: String, required: true },
    description: { type: String, required: true },
    points_redeemed: { type: Number, required: true },
    date: { type: Date, required: true },
    activity_id: { type: String }
});

const loyaltyClientSchema = new mongoose.Schema({
    client_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    activities: [loyaltyActivitySchema],
    rewards: [rewardSchema]
});

const LoyaltyClient = mongoose.model('LoyaltyClient', loyaltyClientSchema);
module.exports = LoyaltyClient;