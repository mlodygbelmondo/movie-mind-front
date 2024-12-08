"use client";

import { Movie } from "@/lib/types";

const FAVORITES_STORAGE_KEY = "movie-mind-favorites";

export class FavoritesService {
  private favorites: Map<string, Set<string>>;

  constructor() {
    this.favorites = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      Object.entries(data).forEach(([userId, movieIds]) => {
        this.favorites.set(userId, new Set(movieIds as string[]));
      });
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    const data: Record<string, string[]> = {};
    this.favorites.forEach((movieIds, userId) => {
      data[userId] = Array.from(movieIds);
    });
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(data));
  }

  addFavorite(userId: string, movie: Movie): void {
    const userFavorites = this.favorites.get(userId) || new Set();
    userFavorites.add(movie.id);
    this.favorites.set(userId, userFavorites);
    this.saveToStorage();
  }

  removeFavorite(userId: string, movie: Movie): void {
    const userFavorites = this.favorites.get(userId);
    if (userFavorites) {
      userFavorites.delete(movie.id);
      this.favorites.set(userId, userFavorites);
      this.saveToStorage();
    }
  }

  isFavorite(userId: string, movie: Movie): boolean {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? userFavorites.has(movie.id) : false;
  }

  getFavorites(userId: string): string[] {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? Array.from(userFavorites) : [];
  }
}
