import { Request, Response, NextFunction } from 'express';
import { historyService } from '../services/history.service';
import type { ApiResponse, SearchHistoryResponse } from '../types/api.types';

export class HistoryController {
  async getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit as string) : 20;

      const history = await historyService.getUserHistory(userId, limitNum);

      const response: ApiResponse<SearchHistoryResponse[]> = {
        success: true,
        data: history,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async clearHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      await historyService.clearHistory(userId);

      const response: ApiResponse = {
        success: true,
        message: 'History cleared',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteHistoryEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'History entry ID is required',
        });
        return;
      }

      await historyService.deleteHistoryEntry(userId, id);

      const response: ApiResponse = {
        success: true,
        message: 'History entry deleted',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const historyController = new HistoryController();
