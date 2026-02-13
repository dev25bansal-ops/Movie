import { z } from 'zod';

export const MoodRequestSchema = z.object({
  mood: z.string().min(1, 'Mood is required').max(500, 'Mood too long'),
});

export type MoodRequest = z.infer<typeof MoodRequestSchema>;

export const FavoriteRequestSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  posterPath: z.string().nullable(),
  overview: z.string().nullable(),
  rating: z.number().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()),
});

export type FavoriteRequest = z.infer<typeof FavoriteRequestSchema>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface MovieResponse {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number;
  releaseDate: string;
  genres: string[];
}

export interface RecommendationResponse {
  mood: string;
  genres: string[];
  movies: MovieResponse[];
}

export interface UserFavoritesResponse {
  id: string;
  movieId: number;
  title: string;
  posterUrl: string | null;
  overview: string | null;
  rating: number | null;
  releaseDate: string | null;
  genres: string[];
  addedAt: string;
}

export interface SearchHistoryResponse {
  id: string;
  mood: string;
  genres: string[];
  movieCount: number;
  searchedAt: string;
}
