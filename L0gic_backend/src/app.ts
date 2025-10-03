import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import { AppDataSource, initializeDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

setupSwagger(app);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Logic Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: AppDataSource.isInitialized ? 'Connected' : 'Disconnected'
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

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
    });
  } catch (error) {
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(0);
});

startServer();

export default app;