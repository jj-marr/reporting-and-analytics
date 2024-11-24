const mongoose = require('mongoose');

const NewUserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name-chan is important! 📛
    email: { type: String, required: true, unique: true }, // Email-chan must be unique! 📧
    password: { type: String, required: true }, // Password-kun for safety! 🔐
    verified: { type: Boolean, default: false }, // Verification status! ✅
    age: { type: Number, required: true }, // Age-san for demographics! 🎂
    gender: { type: String, required: true }, // Gender-chan for inclusivity! 🏳️‍🌈
    contactNumber: { type: String }, // Contact number-san is optional! ☎️
    createdAt: { type: Date, default: Date.now }, // Timestamp-sama! ⏱️
}, { timestamps: true }); // Auto-timestamps for coolness! 😎

module.exports = mongoose.model('NewUser', NewUserSchema, 'users'); // Exporting the model-chan!
