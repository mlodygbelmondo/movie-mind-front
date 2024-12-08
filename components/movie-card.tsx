"use client";

import Image from "next/image";
import { Heart, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/lib/types";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites/favorites-context";
import { useWatchLater } from "@/lib/watch-later/watch-later-context";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const {
    toggleFavorite,
    isFavorite,
    isLoading: isFavLoading,
  } = useFavorites();
  const {
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater,
    isLoading: isWatchLoading,
  } = useWatchLater();
  const isMovieFavorite = isFavorite(movie);
  const isMovieInWatchLater = isInWatchLater(movie.id);

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMovieInWatchLater) {
      removeFromWatchLater(movie.id);
    } else {
      addToWatchLater(movie);
    }
  };

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="block w-[300px] overflow-hidden transition-transform duration-300 hover:scale-[1.02] rounded-t-lg"
    >
      <Card className="w-full flex flex-col h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
          <CardDescription>
            {movie.year} • {movie.genre}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {movie.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", isMovieFavorite && "bg-red-100")}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
            disabled={isFavLoading}
          >
            {isFavLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={cn(
                  "h-4 w-4",
                  isMovieFavorite && "text-red-500 fill-red-500"
                )}
              />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", isMovieInWatchLater && "bg-blue-100")}
            onClick={handleWatchLaterClick}
            disabled={isWatchLoading}
          >
            {isWatchLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Clock
                className={cn(
                  "h-4 w-4",
                  isMovieInWatchLater && "text-blue-500"
                )}
              />
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
