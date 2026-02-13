import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { moodApi } from '../services/api';
import { Loader } from '../components/Loader';
import { Clock, Trash2, History as HistoryIcon } from 'lucide-react';
import type { SearchHistory } from '../types';

export function History() {
  const { history, loadHistory, clearHistory, isLoadingHistory } = useApp();
  const [loadingRecommendations, setLoadingRecommendations] = useState<Set<string>>(new Set());
  const [recommendations, setRecommendations] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleSearchAgain = async (mood: string, historyId: string) => {
    setLoadingRecommendations((prev) => new Set(prev).add(historyId));

    try {
      const result = await moodApi.getRecommendations(mood);
      setRecommendations((prev) => new Map(prev).set(historyId, result));
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setLoadingRecommendations((prev) => {
        const next = new Set(prev);
        next.delete(historyId);
        return next;
      });
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all search history?')) {
      await clearHistory();
    }
  };

  if (isLoadingHistory) {
    return (
      <div className="min-h-screen bg-dark-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-white">Search History</h1>
          <div className="py-20">
            <Loader size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Search History</h1>
            <p className="mt-2 text-gray-400">
              {history.length === 0 
                ? 'No search history yet.' 
                : `${history.length} search${history.length === 1 ? '' : 'es'}`}
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HistoryIcon className="mb-4 h-24 w-24 text-gray-600" />
            <h3 className="mb-2 text-2xl font-semibold text-white">No search history</h3>
            <p className="text-gray-400">
              Start searching for movies based on your mood, and your searches will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item: SearchHistory) => (
              <div
                key={item.id}
                className="rounded-xl bg-dark-800 p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-1 h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-white">"{item.mood}"</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.genres.map((genre) => (
                            <span
                              key={genre}
                              className="rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-400"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          {item.movieCount} movies • {new Date(item.searchedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSearchAgain(item.mood, item.id)}
                    disabled={loadingRecommendations.has(item.id)}
                    className="flex-shrink-0 rounded-xl bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loadingRecommendations.has(item.id) ? (
                      <Loader size="sm" />
                    ) : (
                      'Search Again'
                    )}
                  </button>
                </div>

                {recommendations.has(item.id) && (
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <p className="mb-3 text-sm text-gray-400">Results:</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {recommendations.get(item.id)?.movies.slice(0, 6).map((movie: any) => (
                        <div key={movie.id} className="aspect-[2/3] overflow-hidden rounded-lg bg-dark-900">
                          {movie.posterUrl ? (
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              {movie.title}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
