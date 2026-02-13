import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

class Database {
  private static instance: PrismaClient | null = null;
  private static errorLogged: boolean = false;

  // Don't connect automatically - connect on demand
  static getInstance(): PrismaClient | null {
    return Database.instance;
  }

  static async connect(): Promise<PrismaClient | null> {
    if (Database.instance) {
      return Database.instance;
    }

    if (Database.errorLogged) {
      return null; // Already tried and failed
    }

    try {
      const client = new PrismaClient({
        log: process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error', 'warn'],
      });

      await client.$connect();
      Database.instance = client;
      logger.info('Database connected successfully');
      return client;
    } catch (error: any) {
      Database.errorLogged = true;
      logger.warn('Database connection disabled - features requiring database will be unavailable');
      logger.info('You can still use movie recommendations without the database');
      Database.instance = null;
      return null;
    }
  }

  static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
      logger.info('Database disconnected');
      Database.instance = null;
      Database.errorLogged = false;
    }
  }

  static async ensureConnected(): Promise<PrismaClient | null> {
    if (!Database.instance && !Database.errorLogged) {
      return await this.connect();
    }
    return Database.instance;
  }
}

// Don't connect on module load
export const db: PrismaClient | null = Database.getInstance();

export default db;
