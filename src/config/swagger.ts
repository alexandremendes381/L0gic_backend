import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Logic Backend API',
      version: '1.0.0',
      description: 'A REST API for managing user data with Node.js, TypeScript, and SQLite',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'phone', 'position', 'birthDate', 'message'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            phone: {
              type: 'string',
              description: 'The phone number of the user',
            },
            position: {
              type: 'string',
              description: 'The position/job title of the user',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'The birth date of the user (YYYY-MM-DD)',
            },
            message: {
              type: 'string',
              description: 'A message from the user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the user was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the user was last updated',
            },
          },
          example: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            position: 'Software Developer',
            birthDate: '1990-05-15',
            message: 'Hello, this is a test message',
            createdAt: '2023-12-07T10:00:00.000Z',
            updatedAt: '2023-12-07T10:00:00.000Z',
          },
        },
        CreateUser: {
          type: 'object',
          required: ['name', 'email', 'phone', 'position', 'birthDate', 'message'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            phone: {
              type: 'string',
              description: 'The phone number of the user',
            },
            position: {
              type: 'string',
              description: 'The position/job title of the user',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'The birth date of the user (YYYY-MM-DD)',
            },
            message: {
              type: 'string',
              description: 'A message from the user',
            },
          },
          example: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            position: 'Software Developer',
            birthDate: '1990-05-15',
            message: 'Hello, this is a test message',
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            phone: {
              type: 'string',
              description: 'The phone number of the user',
            },
            position: {
              type: 'string',
              description: 'The position/job title of the user',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'The birth date of the user (YYYY-MM-DD)',
            },
            message: {
              type: 'string',
              description: 'A message from the user',
            },
          },
          example: {
            name: 'John Smith',
            position: 'Senior Software Developer',
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
          example: {
            error: 'User not found',
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Logic Backend API Documentation',
  }));
  
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};