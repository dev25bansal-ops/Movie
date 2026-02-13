import { Request, Response, NextFunction } from 'express';
import { movieService } from '../services/movie.service';
import type { ApiResponse, MovieResponse } from '../types/api.types';

export class MovieController {
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req.query;

      if (!query || typeof query !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
        return;
      }

      const movies = await movieService.searchMovies(query);

      const response: ApiResponse<MovieResponse[]> = {
        success: true,
        data: movies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          error: 'Invalid movie ID',
        });
        return;
      }

      const movie = await movieService.getMovieDetails(Number(id));

      const response: ApiResponse<MovieResponse> = {
        success: true,
        data: movie,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getPopular(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page } = req.query;
      const pageNum = page ? parseInt(page as string) : 1;

      const movies = await movieService.getPopularMovies(pageNum);

      const response: ApiResponse<MovieResponse[]> = {
        success: true,
        data: movies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getTrending(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movies = await movieService.getTrendingMovies();

      const response: ApiResponse<MovieResponse[]> = {
        success: true,
        data: movies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const movieController = new MovieController();
