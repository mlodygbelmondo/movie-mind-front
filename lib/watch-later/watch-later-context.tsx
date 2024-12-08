"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import {
  addToWatchLater as addToWatchLaterService,
  removeFromWatchLater as removeFromWatchLaterService,
  getWatchLaterMovies,
  isInWatchLater as isInWatchLaterService,
} from "./watch-later-service";
import { useToast } from "@/hooks/use-toast";

interface WatchLaterContextType {
  watchLater: Movie[];
  addToWatchLater: (movie: Movie) => void;
  removeFromWatchLater: (movieId: string) => void;
  isInWatchLater: (movieId: string) => boolean;
  isLoading: boolean;
}

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(
  undefined
);

export function WatchLaterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setWatchLater(getWatchLaterMovies());
    setIsLoading(false);
  }, []);

  const addToWatchLater = (movie: Movie) => {
    addToWatchLaterService(movie);
    setWatchLater(getWatchLaterMovies());
    toast({
      title: "Added to Watch Later",
      description: `${movie.title} has been added to your watch later list.`,
    });
  };

  const removeFromWatchLater = (movieId: string) => {
    const movie = watchLater.find((m) => m.id === movieId);
    removeFromWatchLaterService(movieId);
    setWatchLater(getWatchLaterMovies());
    if (movie) {
      toast({
        title: "Removed from Watch Later",
        description: `${movie.title} has been removed from your watch later list.`,
      });
    }
  };

  const isInWatchLater = (movieId: string) => {
    return isInWatchLaterService(movieId);
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        addToWatchLater,
        removeFromWatchLater,
        isInWatchLater,
        isLoading,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export function useWatchLater() {
  const context = useContext(WatchLaterContext);
  if (context === undefined) {
    throw new Error("useWatchLater must be used within a WatchLaterProvider");
  }
  return context;
}
