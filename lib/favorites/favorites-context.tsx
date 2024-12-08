"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { FavoritesService } from "./favorites-service";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
  favorites: string[];
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Mock user ID for demo purposes
const MOCK_USER_ID = "user123";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritesService] = useState(() => new FavoritesService());
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial favorites
    setFavorites(favoritesService.getFavorites(MOCK_USER_ID));
  }, [favoritesService]);

  const toggleFavorite = async (movie: Movie) => {
    setIsLoading(true);
    try {
      const isFav = favoritesService.isFavorite(MOCK_USER_ID, movie);

      if (isFav) {
        favoritesService.removeFavorite(MOCK_USER_ID, movie);
        toast({
          title: "Removed from favorites",
          description: `${movie.title} has been removed from your favorites.`,
        });
      } else {
        favoritesService.addFavorite(MOCK_USER_ID, movie);
        toast({
          title: "Added to favorites",
          description: `${movie.title} has been added to your favorites.`,
        });
      }

      setFavorites(favoritesService.getFavorites(MOCK_USER_ID));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (movie: Movie) => {
    return favoritesService.isFavorite(MOCK_USER_ID, movie);
  };

  return (
    <FavoritesContext.Provider
      value={{ toggleFavorite, isFavorite, favorites, isLoading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
