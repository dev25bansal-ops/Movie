import axios from 'axios';
import type {
  ApiResponse,
  Movie,
  RecommendationResponse,
  FavoriteMovie,
  SearchHistory,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred');
    }
    if (error.request) {
      throw new Error('No response from server');
    }
    throw error;
  }
);

export const movieApi = {
  search: async (query: string): Promise<Movie[]> => {
    const response = await api.get<ApiResponse<Movie[]>>('/api/movies/search', {
      params: { query },
    });
    return response.data.data || [];
  },

  getDetails: async (id: number): Promise<Movie> => {
    const response = await api.get<ApiResponse<Movie>>(`/api/movies/${id}`);
    return response.data.data!;
  },

  getPopular: async (page: number = 1): Promise<Movie[]> => {
    const response = await api.get<ApiResponse<Movie[]>>('/api/movies/popular', {
      params: { page },
    });
    return response.data.data || [];
  },

  getTrending: async (): Promise<Movie[]> => {
    const response = await api.get<ApiResponse<Movie[]>>('/api/movies/trending');
    return response.data.data || [];
  },
};

export const moodApi = {
  getRecommendations: async (mood: string): Promise<RecommendationResponse> => {
    const response = await api.post<ApiResponse<RecommendationResponse>>('/api/mood/recommend', {
      mood,
    });
    return response.data.data!;
  },
};

export const favoriteApi = {
  addToFavorites: async (movie: Partial<Movie>): Promise<FavoriteMovie> => {
    const response = await api.post<ApiResponse<FavoriteMovie>>('/api/favorites', {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.posterUrl,
      overview: movie.overview,
      rating: movie.rating,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
    });
    return response.data.data!;
  },

  getFavorites: async (): Promise<FavoriteMovie[]> => {
    const response = await api.get<ApiResponse<FavoriteMovie[]>>('/api/favorites');
    return response.data.data || [];
  },

  removeFromFavorites: async (movieId: number): Promise<void> => {
    await api.delete(`/api/favorites/${movieId}`);
  },

  checkFavorite: async (movieId: number): Promise<boolean> => {
    const response = await api.get<ApiResponse<{ isFavorite: boolean }>>(
      `/api/favorites/check/${movieId}`
    );
    return response.data.data?.isFavorite || false;
  },
};

export const historyApi = {
  getHistory: async (limit: number = 20): Promise<SearchHistory[]> => {
    const response = await api.get<ApiResponse<SearchHistory[]>>('/api/history', {
      params: { limit },
    });
    return response.data.data || [];
  },

  clearHistory: async (): Promise<void> => {
    await api.delete('/api/history');
  },

  deleteHistoryEntry: async (historyId: string): Promise<void> => {
    await api.delete(`/api/history/${historyId}`);
  },
};

export default api;
