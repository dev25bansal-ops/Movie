import axios from 'axios';
import { env } from './env';

export const tmdbClient = axios.create({
  baseURL: env.TMDB_BASE_URL,
  params: {
    api_key: env.TMDB_API_KEY,
  },
  timeout: 10000,
});

tmdbClient.interceptors.request.use((config) => {
  return config;
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(`TMDB API Error: ${error.response.status} - ${error.response.statusText}`);
    }
    if (error.request) {
      throw new Error('TMDB API: No response received');
    }
    throw error;
  }
);

export const tmdbConfig = {
  imageBaseUrl: env.TMDB_IMAGE_BASE_URL,
  posterSizes: {
    small: 'w92',
    medium: 'w185',
    large: 'w342',
    xl: 'w500',
    original: 'original',
  },
  backdropSizes: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
};

export const getImageUrl = (
  path: string | null,
  size: keyof typeof tmdbConfig.posterSizes = 'large'
): string | null => {
  if (!path) return null;
  return `${tmdbConfig.imageBaseUrl}/${tmdbConfig.posterSizes[size]}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size: keyof typeof tmdbConfig.backdropSizes = 'large'
): string | null => {
  if (!path) return null;
  return `${tmdbConfig.imageBaseUrl}/${tmdbConfig.backdropSizes[size]}${path}`;
};
