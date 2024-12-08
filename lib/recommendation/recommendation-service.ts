"use client";

import { Movie, UserRating, User } from '@/lib/types';
import { MatrixFactorization } from './matrix-factorization';

export class RecommendationService {
  private mf: MatrixFactorization;
  private movies: Movie[];
  private userRatings: UserRating[];

  constructor(movies: Movie[], userRatings: UserRating[]) {
    this.movies = movies;
    this.userRatings = userRatings;
    
    const numUsers = Math.max(...userRatings.map(r => r.userId)) + 1;
    const numItems = movies.length;
    
    this.mf = new MatrixFactorization(numUsers, numItems);
    this.train();
  }

  private train(): void {
    this.mf.train(this.userRatings);
  }

  getPersonalizedRecommendations(userId: number, n: number = 10): Movie[] {
    return this.mf.getRecommendations(userId, this.movies, n);
  }

  getSimilarMovies(movieId: string, n: number = 5): Movie[] {
    // Find users who rated this movie
    const movieRaters = this.userRatings.filter(r => r.movieId === parseInt(movieId));
    
    // Get their other highly rated movies
    const otherMovies = new Map<string, number>();
    
    movieRaters.forEach(rating => {
      const userRatings = this.userRatings.filter(r => 
        r.userId === rating.userId && r.movieId !== parseInt(movieId)
      );
      
      userRatings.forEach(r => {
        const currentCount = otherMovies.get(r.movieId.toString()) || 0;
        otherMovies.set(r.movieId.toString(), currentCount + 1);
      });
    });

    // Sort and return top N similar movies
    return Array.from(otherMovies.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([id]) => this.movies.find(m => m.id === id)!)
      .filter(Boolean);
  }
}