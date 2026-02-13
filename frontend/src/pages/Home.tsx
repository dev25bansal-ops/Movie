import React, { useState } from 'react';
import { moodApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { MoodInput } from '../components/MoodInput';
import { MovieCard } from '../components/MovieCard';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { MovieModal } from '../components/MovieModal';
import { Sparkles, Clock } from 'lucide-react';
import type { Movie, RecommendationResponse } from '../types';

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { addToFavorites, removeFromFavorites, isFavorite, addToHistory } = useApp();

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await moodApi.getRecommendations(mood);
      setRecommendations(result);
      addToHistory({
        id: Date.now().toString(),
        mood: result.mood,
        genres: result.genres,
        movieCount: result.movies.length,
        searchedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async (movie: Movie) => {
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            AI-Powered Movie
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {' '}Recommendations
            </span>
          </h1>
          <p className="text-lg text-gray-400">
            Tell us how you're feeling, and we'll find the perfect movies for you
          </p>
        </div>

        <div className="mx-auto max-w-3xl mb-12">
          <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="py-20">
            <Loader size="lg" />
            <p className="mt-4 text-center text-gray-400">Analyzing your mood...</p>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-md">
            <ErrorMessage message={error} onRetry={() => {}} />
          </div>
        )}

        {recommendations && !isLoading && (
          <div className="animate-slide-up">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Movies for "{recommendations.mood}"
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recommendations.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {recommendations.movies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No movies found matching your mood.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {recommendations.movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={isFavorite(movie.id)}
                    onToggleFavorite={() => handleToggleFavorite(movie)}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedMovie)}
        />
      )}
    </div>
  );
}
