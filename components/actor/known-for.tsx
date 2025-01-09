"use client";
import { useFavorites } from "@/lib/favorites/favorites-context";
import { type FunctionComponent } from "react";
import { MovieCard } from "../movie-card";

export const KnownFor: FunctionComponent = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex space-x-4 pb-4">
      {favorites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
