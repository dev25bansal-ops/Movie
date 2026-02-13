import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';
import { PageLoader, Loader } from '../components/Loader';
import { Heart, Trash2 } from 'lucide-react';
import type { FavoriteMovie } from '../types';

export function Favorites() {
  const {
    favorites,
    removeFromFavorites,
    loadFavorites,
    isLoadingFavorites,
  } = useApp();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = async (movieId: number) => {
    await removeFromFavorites(movieId);
  };

  if (isLoadingFavorites) {
    return (
      <div className="min-h-screen bg-dark-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-white">My Favorites</h1>
          <PageLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">My Favorites</h1>
          <p className="mt-2 text-gray-400">
            {favorites.length === 0 
              ? 'No favorites yet. Start adding movies you love!' 
              : `${favorites.length} movie${favorites.length === 1 ? '' : 's'} saved`}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="mb-4 h-24 w-24 text-gray-600" />
            <h3 className="mb-2 text-2xl font-semibold text-white">No favorites yet</h3>
            <p className="text-gray-400">
              Start exploring movies and add your favorites to keep track of them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative group">
                <MovieCard
                  movie={{
                    id: favorite.movieId,
                    title: favorite.title,
                    overview: favorite.overview || '',
                    posterUrl: favorite.posterUrl,
                    backdropUrl: null,
                    rating: favorite.rating || 0,
                    releaseDate: favorite.releaseDate || '',
                    genres: favorite.genres,
                  }}
                  isFavorite={true}
                  onToggleFavorite={() => handleRemoveFavorite(favorite.movieId)}
                />
                <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleRemoveFavorite(favorite.movieId)}
                    className="rounded-full bg-red-600 p-2 text-white shadow-lg hover:bg-red-700"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
