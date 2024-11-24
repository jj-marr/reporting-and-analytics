const mongoose = require('mongoose');

const _connectDB = async () => {
    try {
        // Add these options to make connection-chan more stable! uwu
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Make sure MongoDB is listening on the right port
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alphabiz';

        console.log('OwO trying to connect to:', mongoURI);

        const conn = await mongoose.connect(mongoURI, options);

        console.log(`(★‿★) MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('(╥﹏╥) Connection error:', error);
        process.exit(1);
    }
};

// 💖 New DB connection for demographics 💖 (It's like a secret portal! 💫)
const newMongoURI = process.env.GROUP2_MONGO;
const new_connectDB = async () => { // New connection function!
    try {
        await mongoose.connect(newMongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Yay! Connected to the new MongoDB for demographics! 🎉');
    } catch (error) {
        console.error('Oh no! New MongoDB connection failed! 😭', error);
        process.exit(1);
    }
};

module.exports = _connectDB;
module.exports = new_connectDB;
