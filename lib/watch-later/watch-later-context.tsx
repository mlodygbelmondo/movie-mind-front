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
import { useSessionData } from "@/hooks/use-session-data";

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
  const { accessToken, userId } = useSessionData();

  useEffect(() => {
    setWatchLater(getWatchLaterMovies());
    setIsLoading(false);
  }, []);

  const addToWatchLaterCommand = async (movie: Movie) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/watchLater/${movie.id}`,
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

  const removeFromWatchLaterCommand = async (movieId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/watchLater/${movieId}`,
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

  const addToWatchLater = (movie: Movie) => {
    addToWatchLaterService(movie);
    addToWatchLaterCommand(movie);
    setWatchLater(getWatchLaterMovies());
    toast({
      title: "Dodano do Do Obejrzenia",
      description: `Film "${movie.title}" został dodany do listy filmów do obejrzenia.`,
    });
  };

  const removeFromWatchLater = (movieId: string) => {
    const movie = watchLater.find((m) => m.id === movieId);
    removeFromWatchLaterService(movieId);
    removeFromWatchLaterCommand(movieId);
    setWatchLater(getWatchLaterMovies());
    if (movie) {
      toast({
        title: "Usunięto z Do Obejrzenia",
        description: `Film "${movie.title}" został usunięty z listy filmów do obejrzenia.`,
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
