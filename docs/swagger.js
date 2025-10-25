const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'HHR Builds API',
      version: '1.0.0',
      description: 'CRUD API for Hernandez Hot Rods builds (CSE 341 Project 2)'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://hhr-builds-api.onrender.com', description: 'Current deployment' },
    ],
    components: {
      schemas: {
        Build: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            year: { type: 'integer' },
            model: { type: 'string' },
            subtitle: { type: 'string' },
            plans: { type: 'string' },
            isCompleted: { type: 'boolean' },
            heroPhotoUrl: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          },
          required: ['name','year','model']
        },
        NewBuild: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                year: { type: 'integer' },
                model: { type: 'string' },
                subtitle: { type: 'string' },
                plans: { type: 'string' },
                isCompleted: { type: 'boolean' },
                heroPhotoUrl: { type: 'string', format: 'uri' }
            },
            required: ['name','year','model'],
            example: {
                name: "1969 Camaro RS",
                year: 1969,
                model: "Camaro RS",
                subtitle: "Restomod reliability upgrade",
                plans: "LS swap, 4L60E, disc brakes",
                isCompleted: false,
                heroPhotoUrl: "https://example.com/camaro.jpg"
            }
            }
      }
    }
  },
  apis: ['./routes/*.js'] // we’ll annotate endpoints below
};

module.exports = swaggerJsdoc(options);