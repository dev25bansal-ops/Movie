import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

class Database {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
      });

      if (process.env.NODE_ENV === 'development') {
        Database.instance.$on('query', (e) => {
          logger.debug('Query: ' + e.query);
          logger.debug('Duration: ' + e.duration + 'ms');
        });
      }

      Database.instance.$connect()
        .then(() => {
          logger.info('Database connected successfully');
        })
        .catch((error) => {
          logger.error('Database connection failed:', error);
          throw error;
        });
    }

    return Database.instance;
  }

  static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
      logger.info('Database disconnected');
    }
  }
}

export const db = Database.getInstance();

export default db;
