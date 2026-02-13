import { analyzeMood } from '../config/gemini';
import type { RecommendationResponse } from '../types/api.types';
import { movieService } from './movie.service';

export class MoodService {
  async getRecommendations(mood: string): Promise<RecommendationResponse> {
    try {
      const genres = await analyzeMood(mood);

      if (genres.length === 0) {
        genres.push('drama');
      }

      const genreIds = movieService.convertGenreNamesToIds(genres);
      const movies = await movieService.getMoviesByGenreIds(genreIds, 1, 12);

      return {
        mood,
        genres,
        movies,
      };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw new Error('Failed to generate recommendations');
    }
  }
}

export const moodService = new MoodService();
