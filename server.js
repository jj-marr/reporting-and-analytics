const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const _connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB before starting server-chan!
_connectDB().then(() => {
    // Middleware-chan! ✨
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    // Routes owo
    app.use('/api/analytics', require('./routes/analytics'));

    // Error handler
    app.use((err, req, res, next) => {
        console.error('OwO what\'s this? An error!', err);
        res.status(500).json({
            message: 'Gomen nasai! Something went wrong (╥﹏╥)',
            error: err.message
        });
    });

    app.listen(PORT, () => {
        console.log(`(★‿★) Server-chan is running on port ${PORT} uwu!`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB (╥﹏╥)', error);
});
