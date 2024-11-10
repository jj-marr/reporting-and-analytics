const mongoose = require('mongoose');

const _connectDB = async () => {
    try {
        // Add these options to make connection-chan more stable! uwu
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Make sure MongoDB is listening on the right port
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kawaii_reports';

        console.log('OwO trying to connect to:', mongoURI);

        const conn = await mongoose.connect(mongoURI, options);

        console.log(`(★‿★) MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('(╥﹏╥) Connection error:', error);
        process.exit(1);
    }
};

module.exports = _connectDB;
