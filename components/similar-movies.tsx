"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "@/components/movie-card";
import { mockMovies } from "@/lib/mock";

interface SimilarMoviesProps {
  movieId: string;
}

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const similarMovies = mockMovies
    .filter((m) => m.id !== movieId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <ScrollArea>
      <div className="flex space-x-4 pb-4">
        {similarMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
