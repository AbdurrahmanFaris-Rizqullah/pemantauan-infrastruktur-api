const swaggerJsDoc = require('swagger-jsdoc');

// Definisikan konfigurasi swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Public Infrastructure Monitoring API',
      version: 'Beta 1.0.0',
      description: 'API untuk memantau infrastruktur publik seperti jalan, trotoar, lampu jalan, dan lainnya',
    },
    servers: [
      {
        url: 'http://localhost:3000/api-docs',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to the API docs

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
