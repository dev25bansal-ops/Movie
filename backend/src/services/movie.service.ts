import { tmdbClient, getImageUrl, getBackdropUrl } from '../config/tmdb';
import { GenreMap, GenreIdMap } from '../types/tmdb.types';
import type { MovieResponse, RecommendationResponse } from '../types/api.types';

export class MovieService {
  async getMoviesByGenreIds(
    genreIds: number[],
    page: number = 1,
    limit: number = 12
  ): Promise<MovieResponse[]> {
    try {
      const { data } = await tmdbClient.get('/discover/movie', {
        params: {
          with_genres: genreIds.join(','),
          page,
          'vote_average.gte': 6,
          sort_by: 'popularity.desc',
        },
      });

      return data.results.slice(0, limit).map(this.mapToMovieResponse);
    } catch (error) {
      console.error('Error fetching movies by genres:', error);
      throw error;
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse[]> {
    try {
      const { data } = await tmdbClient.get('/search/movie', {
        params: {
          query,
          page,
        },
      });

      return data.results.map(this.mapToMovieResponse);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  async getMovieDetails(movieId: number): Promise<MovieResponse> {
    try {
      const { data } = await tmdbClient.get(`/movie/${movieId}`);
      return this.mapToMovieResponse(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  async getPopularMovies(page: number = 1, limit: number = 12): Promise<MovieResponse[]> {
    try {
      const { data } = await tmdbClient.get('/movie/popular', {
        params: { page },
      });

      return data.results.slice(0, limit).map(this.mapToMovieResponse);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  async getTrendingMovies(limit: number = 10): Promise<MovieResponse[]> {
    try {
      const { data } = await tmdbClient.get('/trending/movie/week');
      return data.results.slice(0, limit).map(this.mapToMovieResponse);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }

  convertGenreNamesToIds(genreNames: string[]): number[] {
    return genreNames
      .map((name) => GenreIdMap[name.toLowerCase()])
      .filter((id): id is number => id !== undefined);
  }

  convertGenreIdsToNames(genreIds: number[]): string[] {
    return genreIds
      .map((id) => GenreMap[id])
      .filter((name): name is string => name !== undefined);
  }

  private mapToMovieResponse(movie: any): MovieResponse {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview || '',
      posterUrl: getImageUrl(movie.poster_path),
      backdropUrl: getBackdropUrl(movie.backdrop_path),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      genres: movie.genre_ids
        ? this.convertGenreIdsToNames(movie.genre_ids)
        : movie.genres?.map((g: any) => g.name.toLowerCase()) || [],
    };
  }
}

export const movieService = new MovieService();
