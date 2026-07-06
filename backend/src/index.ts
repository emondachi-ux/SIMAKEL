import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './config/logger';
import { initializeDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { authRoutes } from './routes/authRoutes';
import { classesRoutes } from './routes/classesRoutes';
import { studentsRoutes } from './routes/studentsRoutes';
import { attendanceRoutes } from './routes/attendanceRoutes';
import { gradesRoutes } from './routes/gradesRoutes';
import { syncRoutes } from './routes/syncRoutes';
import { dashboardRoutes } from './routes/dashboardRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classes', classesRoutes);
app.use('/api/v1/students', studentsRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/grades', gradesRoutes);
app.use('/api/v1/sync', syncRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// Initialize and start server
const startServer = async (): Promise<void> => {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized successfully');

    // Start listening
    app.listen(PORT, () => {
      logger.info(`SIMAKEL Backend running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info('Ready to accept connections...');
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

export default app;
