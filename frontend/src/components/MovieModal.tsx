import React from 'react';
import { X, Star, Calendar, Play } from 'lucide-react';
import type { Movie } from '../types';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function MovieModal({ movie, onClose, isFavorite, onToggleFavorite }: MovieModalProps) {
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-dark-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-all hover:bg-black/80"
        >
          <X className="h-6 w-6" />
        </button>

        {movie.backdropUrl && (
          <div className="relative h-64 sm:h-96">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
          </div>
        )}

        <div className="relative -mt-32 px-8 pb-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            {movie.posterUrl && (
              <div className="flex-shrink-0">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-48 rounded-xl shadow-xl"
                />
              </div>
            )}

            <div className="flex-1">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{movie.title}</h2>

              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-white">{movie.rating.toFixed(1)}</span>
                </div>

                {movie.releaseDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                <span style={{ fill: isFavorite ? 'red' : 'none' }}>
                  {isFavorite ? '♥' : '♡'}
                </span>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
