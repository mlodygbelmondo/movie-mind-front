"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import {
  addToFavorite as addToFavoriteService,
  removeFromFavorite as removeFromFavoriteService,
  getFavoriteMovies,
  isInFavorite as isInFavoriteService,
} from "./favorites-service";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: string) => void;
  isInFavorites: (movieId: string) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setFavorites(getFavoriteMovies());
    setIsLoading(false);
  }, []);

  const addToFavorites = (movie: Movie) => {
    addToFavoriteService(movie);
    setFavorites(getFavoriteMovies());
    toast({
      title: "Dodano do Do Obejrzenia",
      description: `${movie.title} został dodany do listy filmów do obejrzenia.`,
    });
  };

  const removeFromFavorites = (movieId: string) => {
    const movie = favorites.find((m) => m.id === movieId);
    removeFromFavoriteService(movieId);
    setFavorites(getFavoriteMovies());
    if (movie) {
      toast({
        title: "Usunięto z Do Obejrzenia",
        description: `${movie.title} został usunięty z listy filmów do obejrzenia.`,
      });
    }
  };

  const isInFavorites = (movieId: string) => {
    return isInFavoriteService(movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useWatchLater must be used within a WatchLaterProvider");
  }
  return context;
}
