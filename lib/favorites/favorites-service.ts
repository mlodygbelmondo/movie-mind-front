import { Movie } from "@/lib/types";

const FAVORITES_KEY = "favorite";

export function getFavoriteMovies(): Movie[] {
  if (typeof window === "undefined") return [];
  const favorite = localStorage.getItem(FAVORITES_KEY);
  return favorite ? JSON.parse(favorite) : [];
}

export function addToFavorite(movie: Movie): void {
  const favorite = getFavoriteMovies();
  if (!favorite.some((m) => m.id === movie.id)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorite, movie]));
  }
}

export function removeFromFavorite(movieId: string): void {
  const favorite = getFavoriteMovies();
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorite.filter((movie) => movie.id !== movieId))
  );
}

export function isInFavorite(movieId: string): boolean {
  const favorite = getFavoriteMovies();
  return favorite.some((movie) => movie.id === movieId);
}
