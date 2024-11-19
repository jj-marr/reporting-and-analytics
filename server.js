const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
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

    // Swagger documentation route owo
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
        customCss: '.swagger-ui .topbar { background-color: #ff69b4; }', // Make it kawaii pink!
        customSiteTitle: "AlphaBiz Analytics API Documentation ✨"
    }));

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
        console.log(`(★‿★) API Documentation available at http://localhost:${PORT}/api-docs`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB (╥﹏╥)', error);
});
