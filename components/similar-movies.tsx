"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "@/components/movie-card";
import { mockMovies } from "@/lib/mock";
import { APIQueries } from "@/lib/api/api-queries";
import { useQuery } from "@/hooks/use-query";
import { Movie } from "@/lib/types";

interface SimilarMoviesProps {
  movieId: string;
}

type Data = {
  recommendations: Movie[];
};

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { data: similarMoviesData, isLoading: isSimilarMoviesDataLoading } =
    useQuery({
      endpoint: APIQueries.getRecommendedMovies,
      params: {
        movieId,
      },
    });

  if (isSimilarMoviesDataLoading) return <div>Ładowanie...</div>;

  const { recommendations: similarMovies } = similarMoviesData as Data;

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
