export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number;
  releaseDate: string;
  genres: string[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
}

export interface RecommendationResponse {
  mood: string;
  genres: string[];
  movies: Movie[];
}

export interface FavoriteMovie {
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

export interface SearchHistory {
  id: string;
  mood: string;
  genres: string[];
  movieCount: number;
  searchedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
