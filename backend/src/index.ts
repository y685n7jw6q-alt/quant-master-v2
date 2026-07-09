import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB, connectRedis } from './config';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { validationMiddleware } from './middleware/validation';
import authRoutes from './routes/auth';
import skillRoutes from './routes/skills';
import questionRoutes from './routes/questions';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validationMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/questions', questionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: '✅ Server is running' });
});

// Error handling
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
