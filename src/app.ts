import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import { database } from './config/database';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração CORS otimizada para Vercel
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Permitir requisições sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Lista de origens permitidas
    const allowedOrigins = [
      // Desenvolvimento local
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'https://localhost:3000',
      'https://localhost:5173',
      // Vercel domains
      /^https:\/\/.*\.vercel\.app$/,
      /^https:\/\/l0gic-backend.*\.vercel\.app$/,
      process.env.FRONTEND_URL, // URL do frontend se definida
    ].filter(Boolean);
    
    // Em desenvolvimento, permitir qualquer origem
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Verificar se a origem está permitida
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma',
    'X-Custom-Header'
  ]
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', routes);

setupSwagger(app);

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Logic Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    status: 404,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = 500;
  const message = err.message || 'Internal server error';
  
  res.status(status).json({ error: message });
});

process.on('SIGTERM', async () => {
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await database.close();
  process.exit(0);
});

app.listen(PORT, () => {});

export default app;