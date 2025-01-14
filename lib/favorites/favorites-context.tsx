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
import { useSessionData } from "@/hooks/use-session-data";

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

  const { accessToken, userId } = useSessionData();

  useEffect(() => {
    setFavorites(getFavoriteMovies());
    setIsLoading(false);
  }, []);

  const addToFavoriteCommand = async (movie: Movie) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/favorite/${movie.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            movieId: movie.id,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFavoriteCommand = async (movieId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/favorite/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            movieId,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavorites = (movie: Movie) => {
    addToFavoriteService(movie);
    setFavorites(getFavoriteMovies());

    void addToFavoriteCommand(movie);
    toast({
      title: "Dodano do Ulubionych",
      description: `Film "${movie.title}" został dodany do ulubionych.`,
    });
  };

  const removeFromFavorites = (movieId: string) => {
    const movie = favorites.find((m) => m.id === movieId);
    removeFromFavoriteService(movieId);
    void removeFromFavoriteCommand(movieId);
    setFavorites(getFavoriteMovies());
    if (movie) {
      toast({
        title: "Usunięto z Ulubionych",
        description: `Film "${movie.title}" został usunięty z ulubionych.`,
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
