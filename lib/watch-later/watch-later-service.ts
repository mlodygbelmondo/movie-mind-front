import { Movie } from "@/lib/types";

const WATCH_LATER_KEY = "watchLater";

export function getWatchLaterMovies(): Movie[] {
  if (typeof window === "undefined") return [];
  const watchLater = localStorage.getItem(WATCH_LATER_KEY);
  return watchLater ? JSON.parse(watchLater) : [];
}

export function addToWatchLater(movie: Movie): void {
  const watchLater = getWatchLaterMovies();
  if (!watchLater.some((m) => m.id === movie.id)) {
    localStorage.setItem(
      WATCH_LATER_KEY,
      JSON.stringify([...watchLater, movie])
    );
  }
}

export function removeFromWatchLater(movieId: string): void {
  const watchLater = getWatchLaterMovies();
  localStorage.setItem(
    WATCH_LATER_KEY,
    JSON.stringify(watchLater.filter((movie) => movie.id !== movieId))
  );
}

export function isInWatchLater(movieId: string): boolean {
  const watchLater = getWatchLaterMovies();
  return watchLater.some((movie) => movie.id === movieId);
}
