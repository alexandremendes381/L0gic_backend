import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import { database } from './config/database';

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