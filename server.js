const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware that's as protective as Erza's armor! 🛡️
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Our kawaii routes (◕‿◕✿)
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

// Error handler that's as dependable as Alphonse Elric! 
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

