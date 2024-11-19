const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_type: { type: String, enum: ['purchase', 'redeem', 'refund'], required: true },
    transaction_date: { type: Date, required: true },
    transaction_cost: { type: Number, required: true },
    productName: { type: String, required: true },
    points_change: { type: Number, required: true },
    description: { type: String }
});

const activityLogSchema = new mongoose.Schema({
    activity_type: { type: String, required: true },
    activity_field: { type: String, required: true },
    activity_date: { type: Date, required: true }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    points_balance: { type: Number, default: 0 },
    transaction_history: { type: Map, of: transactionSchema },
    activity_log: [activityLogSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;