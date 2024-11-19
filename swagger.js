// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AlphaBiz Analytics API ✨',
            version: '1.0.0',
            description: 'Kawaii API documentation for AlphaBiz Analytics microservice uwu',
            contact: {
                name: 'AlphaBiz Support Team',
                email: 'support@alphabiz.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server desu~'
            }
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;
