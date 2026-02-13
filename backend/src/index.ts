import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { logger, stream } from './config/logger';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});

app.use('/api', limiter);

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'AI-Powered Movie Recommendation API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      movies: '/api/movies',
      mood: '/api/mood',
      favorites: '/api/favorites',
      history: '/api/history',
    },
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${env.NODE_ENV}`);
  logger.info(`API Health Check: http://localhost:${PORT}/api/health`);
});

export default app;
