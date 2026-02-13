import { Request, Response, NextFunction } from 'express';
import { favoriteService } from '../services/favorite.service';
import type { ApiResponse, FavoriteRequest, UserFavoritesResponse } from '../types/api.types';
import { FavoriteRequestSchema } from '../types/api.types';

export class FavoriteController {
  async addToFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const favoriteData: FavoriteRequest = FavoriteRequestSchema.parse(req.body);
      const favorite = await favoriteService.addToFavorite(userId, favoriteData);

      const response: ApiResponse<UserFavoritesResponse> = {
        success: true,
        data: favorite,
        message: 'Movie added to favorites',
      };

      res.status(201).json(response);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({
          success: false,
          error: 'Movie already in favorites',
        });
        return;
      }
      if (error.message === 'Movie already in favorites') {
        res.status(409).json({
          success: false,
          error: error.message,
        });
        return;
      }
      next(error);
    }
  }

  async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const favorites = await favoriteService.getUserFavorites(userId);

      const response: ApiResponse<UserFavoritesResponse[]> = {
        success: true,
        data: favorites,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async removeFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
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

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          error: 'Invalid movie ID',
        });
        return;
      }

      await favoriteService.removeFromFavorite(userId, Number(id));

      const response: ApiResponse = {
        success: true,
        message: 'Movie removed from favorites',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async checkFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
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

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          error: 'Invalid movie ID',
        });
        return;
      }

      const isFavorite = await favoriteService.isFavorite(userId, Number(id));

      const response: ApiResponse<{ isFavorite: boolean }> = {
        success: true,
        data: { isFavorite },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const favoriteController = new FavoriteController();
