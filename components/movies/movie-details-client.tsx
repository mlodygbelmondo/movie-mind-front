"use client";

import Image from "next/image";
import { Heart, Star, Clock, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MovieReviews } from "@/components/movie-reviews";
import { SimilarMovies } from "@/components/similar-movies";
import { mockActors, mockMovies } from "@/lib/mock";
import { MovieNotFound } from "@/components/movies/movie-not-found";
import { useFavorites } from "@/lib/favorites/favorites-context";
import { cn } from "@/lib/utils";
import { shareMovie } from "@/lib/utils/share";
import { useState } from "react";
import { useWatchLater } from "@/lib/watch-later/watch-later-context";
import Link from "next/link";

interface MovieDetailsClientProps {
  params: {
    id: string;
  };
}

export default function MovieDetailsClient({
  params,
}: MovieDetailsClientProps) {
  const movie = mockMovies.find((m) => m.id === params.id);
  const {
    toggleFavorite,
    isFavorite,
    isLoading: isFavoriteLoading,
  } = useFavorites();
  const { addToWatchLater, removeFromWatchLater, isInWatchLater } =
    useWatchLater();
  const [isSharing, setIsSharing] = useState(false);

  if (!movie) {
    return <MovieNotFound />;
  }

  const isMovieFavorite = isFavorite(movie);
  const isMovieInWatchLater = isInWatchLater(movie.id);

  // Find random actors for the cast (in a real app, this would be actual cast data)
  const movieActors = mockActors
    .slice(0, movie.cast?.length || 0)
    .map((actor, index) => ({
      ...actor,
      name: movie.cast?.[index], // Use the movie's cast names
    }));

  const handleWatchLaterClick = () => {
    if (isMovieInWatchLater) {
      removeFromWatchLater(movie.id);
    } else {
      addToWatchLater(movie);
    }
  };
  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareMovie(movie);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.genre}</span>
              <span>•</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>

          <p className="text-lg">{movie.description}</p>

          <div className="flex items-center space-x-4">
            <Button
              className={cn(
                "space-x-2",
                isMovieFavorite && "bg-red-100 hover:bg-red-200 text-red-500"
              )}
              onClick={() => toggleFavorite(movie)}
              disabled={isFavoriteLoading}
            >
              {isFavoriteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart
                  className={cn("h-4 w-4", isMovieFavorite && "fill-current")}
                />
              )}
              <span>
                {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </Button>
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                isMovieInWatchLater &&
                  "bg-blue-100 text-blue-500 hover:text-blue-500 hover:bg-blue-200"
              )}
              onClick={handleWatchLaterClick}
            >
              <Clock
                className={cn(
                  "h-5 w-5",
                  isMovieInWatchLater && "text-blue-500"
                )}
              />
              {isMovieInWatchLater
                ? "Remove from Watch Later"
                : "Add to Watch Later"}
            </Button>
            <Button
              variant="outline"
              className="space-x-2"
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span>Share</span>
            </Button>
          </div>

          {/* Additional Details */}
          <Card>
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              <div>
                <p className="text-sm text-muted-foreground">Director</p>
                <p className="font-medium">{movie.director || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {movie.duration || "120"} min
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        {/* Cast Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Cast</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {movieActors.map((actor) => (
              <Link
                key={actor.id}
                href={`/actors/${actor.id}`}
                className="block group flex-shrink-0"
              >
                <div className="space-y-2 w-[150px]">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={actor.imageUrl}
                      alt={actor.name}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="font-medium group-hover:underline">
                      {actor.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <MovieReviews movieId={movie.id} />
      </div>

      {/* Similar Movies */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
        <SimilarMovies movieId={movie.id} />
      </div>
    </div>
  );
}
