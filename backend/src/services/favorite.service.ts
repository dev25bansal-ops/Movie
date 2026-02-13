import db from '../config/database';
import type { FavoriteRequest, UserFavoritesResponse } from '../types/api.types';

export class FavoriteService {
  async addToFavorite(userId: string, favoriteData: FavoriteRequest): Promise<UserFavoritesResponse> {
    const existing = await db.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId: favoriteData.movieId,
        },
      },
    });

    if (existing) {
      throw new Error('Movie already in favorites');
    }

    const favorite = await db.favorite.create({
      data: {
        userId,
        movieId: favoriteData.movieId,
        title: favoriteData.title,
        posterPath: favoriteData.posterPath,
        overview: favoriteData.overview,
        rating: favoriteData.rating,
        releaseDate: favoriteData.releaseDate,
        genres: favoriteData.genres,
      },
    });

    return this.mapToFavoriteResponse(favorite);
  }

  async getUserFavorites(userId: string): Promise<UserFavoritesResponse[]> {
    const favorites = await db.favorite.findMany({
      where: { userId },
      orderBy: { addedAt: 'desc' },
    });

    return favorites.map(this.mapToFavoriteResponse);
  }

  async removeFromFavorite(userId: string, movieId: number): Promise<void> {
    await db.favorite.deleteMany({
      where: {
        userId,
        movieId,
      },
    });
  }

  async isFavorite(userId: string, movieId: number): Promise<boolean> {
    const favorite = await db.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    return !!favorite;
  }

  private mapToFavoriteResponse(favorite: any): UserFavoritesResponse {
    return {
      id: favorite.id,
      movieId: favorite.movieId,
      title: favorite.title,
      posterUrl: favorite.posterPath,
      overview: favorite.overview,
      rating: favorite.rating,
      releaseDate: favorite.releaseDate,
      genres: favorite.genres,
      addedAt: favorite.addedAt.toISOString(),
    };
  }
}

export const favoriteService = new FavoriteService();
