import db from '../config/database';
import type { SearchHistoryResponse } from '../types/api.types';

export class HistoryService {
  async addToHistory(userId: string, mood: string, genres: string[], movieCount: number): Promise<SearchHistoryResponse> {
    if (!db) {
      throw new Error('Database not available - history feature disabled');
    }

    const history = await db.history.create({
      data: {
        userId,
        mood,
        genres,
        movieCount,
      },
    });

    return this.mapToHistoryResponse(history);
  }

  async getUserHistory(userId: string, limit: number = 20): Promise<SearchHistoryResponse[]> {
    if (!db) {
      throw new Error('Database not available - history feature disabled');
    }

    const history = await db.history.findMany({
      where: { userId },
      orderBy: { searchedAt: 'desc' },
      take: limit,
    });

    return history.map(this.mapToHistoryResponse);
  }

  async clearHistory(userId: string): Promise<void> {
    if (!db) {
      throw new Error('Database not available - history feature disabled');
    }

    await db.history.deleteMany({
      where: { userId },
    });
  }

  async deleteHistoryEntry(userId: string, historyId: string): Promise<void> {
    if (!db) {
      throw new Error('Database not available - history feature disabled');
    }

    await db.history.deleteMany({
      where: {
        id: historyId,
        userId,
      },
    });
  }

  private mapToHistoryResponse(history: any): SearchHistoryResponse {
    return {
      id: history.id,
      mood: history.mood,
      genres: history.genres,
      movieCount: history.movieCount,
      searchedAt: history.searchedAt.toISOString(),
    };
  }
}

export const historyService = new HistoryService();
