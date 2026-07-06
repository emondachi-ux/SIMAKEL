import { Pool, QueryResult } from 'pg';
import { logger } from './logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DATABASE_POOL_SIZE || '10'),
  idleTimeoutMillis: parseInt(process.env.DATABASE_POOL_IDLE_TIMEOUT || '30000'),
});

pool.on('error', (err) => {
  logger.error('Unexpected connection error', err);
  process.exit(-1);
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    logger.info('Database connected successfully', { time: result.rows[0] });
    client.release();
  } catch (error) {
    logger.error('Failed to connect to database', error);
    throw error;
  }
};

export const query = async <T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const start = Date.now();
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      logger.warn('Slow query detected', { query: text, duration });
    }
    return result;
  } catch (error) {
    logger.error('Database query error', { query: text, error });
    throw error;
  }
};

export const getPool = (): Pool => pool;

export const disconnect = async (): Promise<void> => {
  await pool.end();
  logger.info('Database connection closed');
};
