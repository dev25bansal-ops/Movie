import React from 'react';
import { Heart } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    posterUrl: string | null;
    rating: number;
    releaseDate: string;
    genres: string[];
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick?: () => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite, onClick }: MovieCardProps) {
  return (
    <div
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-dark-900 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-500/20">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
            <span className="text-center text-sm text-gray-400">{movie.title}</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-2 transition-all duration-200 hover:bg-primary-600"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-1 text-yellow-400">
            <span className="text-sm">★</span>
            <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
          </div>
          <p className="mt-2 line-clamp-3 text-xs text-gray-200">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="truncate font-medium text-white group-hover:text-primary-400">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400">
          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
}
