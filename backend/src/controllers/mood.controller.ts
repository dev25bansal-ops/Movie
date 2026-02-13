import { Request, Response, NextFunction } from 'express';
import { moodService } from '../services/mood.service';
import { historyService } from '../services/history.service';
import type { ApiResponse, RecommendationResponse } from '../types/api.types';
import { MoodRequestSchema } from '../types/api.types';

export class MoodController {
  async getRecommendations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { mood } = MoodRequestSchema.parse(req.body);
      const userId = (req as any).user?.id;

      const recommendations: RecommendationResponse = await moodService.getRecommendations(mood);

      // History is optional - don't fail if it's not connected
      if (userId) {
        try {
          await historyService.addToHistory(
            userId,
            recommendations.mood,
            recommendations.genres,
            recommendations.movies.length
          );
        } catch (historyError) {
          console.warn('Failed to save to history:', historyError);
          // Continue without history
        }
      }

      const response: ApiResponse<RecommendationResponse> = {
        success: true,
        data: recommendations,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const moodController = new MoodController();
