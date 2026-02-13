import React, { createContext, useContext, useState, useCallback } from 'react';
import { favoriteApi, historyApi } from '../services/api';
import type { FavoriteMovie, SearchHistory } from '../types';

interface AppContextType {
  favorites: FavoriteMovie[];
  history: SearchHistory[];
  addToFavorites: (movie: FavoriteMovie) => Promise<void>;
  removeFromFavorites: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loadFavorites: () => Promise<void>;
  loadHistory: () => Promise<void>;
  addToHistory: (item: SearchHistory) => void;
  clearHistory: () => Promise<void>;
  isLoadingFavorites: boolean;
  isLoadingHistory: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const loadFavorites = useCallback(async () => {
    setIsLoadingFavorites(true);
    try {
      const favs = await favoriteApi.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoadingFavorites(false);
    }
  }, []);

  const addToFavorites = useCallback(async (movie: any) => {
    try {
      const newFavorite = await favoriteApi.addToFavorites(movie);
      setFavorites((prev) => [...prev, newFavorite]);
    } catch (error) {
      console.error('Failed to add favorite:', error);
      throw error;
    }
  }, []);

  const removeFromFavorites = useCallback(async (movieId: number) => {
    try {
      await favoriteApi.removeFromFavorites(movieId);
      setFavorites((prev) => prev.filter((f) => f.movieId !== movieId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      throw error;
    }
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((f) => f.movieId === movieId);
    },
    [favorites]
  );

  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const hist = await historyApi.getHistory();
      setHistory(hist);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  const addToHistory = useCallback((item: SearchHistory) => {
    setHistory((prev) => [item, ...prev].slice(0, 20));
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await historyApi.clearHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw error;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        favorites,
        history,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loadFavorites,
        loadHistory,
        addToHistory,
        clearHistory,
        isLoadingFavorites,
        isLoadingHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
