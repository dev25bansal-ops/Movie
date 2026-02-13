import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

class Database {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error', 'warn'],
      });

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
