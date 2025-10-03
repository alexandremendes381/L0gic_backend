import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Logic Backend API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de usuários com Node.js, TypeScript, TypeORM e PostgreSQL. Inclui validações robustas para email, telefone brasileiro e datas.',
      contact: {
        name: 'API Support',
        email: 'support@exemplo.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
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
              description: 'ID auto-gerado do usuário',
            },
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Nome completo do usuário (obrigatório, 2-255 caracteres)',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email válido do usuário (obrigatório, único)',
              example: 'joao.silva@exemplo.com',
            },
            phone: {
              type: 'string',
              pattern: '^\\+55\\d{2}9?\\d{8}$',
              description: 'Telefone brasileiro válido (obrigatório)',
              example: '+5511999999999',
            },
            position: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Cargo/posição do usuário (obrigatório, 2-255 caracteres)',
              example: 'Desenvolvedor',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              pattern: '^\\d{4}-\\d{2}-\\d{2}$',
              description: 'Data de nascimento válida no formato YYYY-MM-DD (obrigatório, não pode ser futura)',
              example: '1990-05-15',
            },
            message: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
              description: 'Mensagem do usuário (obrigatório, 10-1000 caracteres)',
              example: 'Olá, esta é uma mensagem de teste com mais de 10 caracteres.',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de criação do usuário',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da última atualização do usuário',
            },
          },
          example: {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@exemplo.com',
            phone: '+5511999999999',
            position: 'Desenvolvedor',
            birthDate: '1990-05-15',
            message: 'Olá, esta é uma mensagem de teste com mais de 10 caracteres.',
            createdAt: '2025-01-02T10:00:00.000Z',
            updatedAt: '2025-01-02T10:00:00.000Z',
          },
        },
        CreateUser: {
          type: 'object',
          required: ['name', 'email', 'phone', 'position', 'birthDate', 'message'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Nome completo (obrigatório, 2-255 caracteres)',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email válido (obrigatório, único)',
              example: 'joao.silva@exemplo.com',
            },
            phone: {
              type: 'string',
              pattern: '^\\+55\\d{2}9?\\d{8}$',
              description: 'Telefone brasileiro válido (obrigatório)',
              example: '+5511999999999',
            },
            position: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Cargo/posição (obrigatório, 2-255 caracteres)',
              example: 'Desenvolvedor',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              pattern: '^\\d{4}-\\d{2}-\\d{2}$',
              description: 'Data de nascimento válida no formato YYYY-MM-DD (obrigatório, não pode ser futura)',
              example: '1990-05-15',
            },
            message: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
              description: 'Mensagem (obrigatório, 10-1000 caracteres)',
              example: 'Olá, esta é uma mensagem de teste com mais de 10 caracteres.',
            },
          },
          example: {
            name: 'João Silva',
            email: 'joao.silva@exemplo.com',
            phone: '+5511999999999',
            position: 'Desenvolvedor',
            birthDate: '1990-05-15',
            message: 'Olá, esta é uma mensagem de teste com mais de 10 caracteres.',
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Nome completo (2-255 caracteres)',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email válido',
              example: 'joao.silva@exemplo.com',
            },
            phone: {
              type: 'string',
              pattern: '^\\+55\\d{2}9?\\d{8}$',
              description: 'Telefone brasileiro válido',
              example: '+5511999999999',
            },
            position: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
              description: 'Cargo/posição (2-255 caracteres)',
              example: 'Desenvolvedor',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              pattern: '^\\d{4}-\\d{2}-\\d{2}$',
              description: 'Data de nascimento válida no formato YYYY-MM-DD (não pode ser futura)',
              example: '1990-05-15',
            },
            message: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
              description: 'Mensagem (10-1000 caracteres)',
              example: 'Olá, esta é uma mensagem de teste com mais de 10 caracteres.',
            },
          },
          example: {
            name: 'João Santos',
            position: 'Desenvolvedor Sênior',
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
          example: {
            error: 'Usuário não encontrado',
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'Endpoints para gerenciamento de usuários',
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