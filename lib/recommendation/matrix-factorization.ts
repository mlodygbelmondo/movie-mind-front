"use client";

import { Matrix } from 'ml-matrix';
import { Movie, UserRating } from '@/lib/types';

export class MatrixFactorization {
  private userFactors: Matrix;
  private itemFactors: Matrix;
  private numFactors: number;
  private learningRate: number;
  private regularization: number;
  private numIterations: number;

  constructor(
    numUsers: number,
    numItems: number,
    numFactors = 10,
    learningRate = 0.01,
    regularization = 0.01,
    numIterations = 100
  ) {
    this.numFactors = numFactors;
    this.learningRate = learningRate;
    this.regularization = regularization;
    this.numIterations = numIterations;

    // Initialize random matrices for user and item factors
    this.userFactors = Matrix.random(numUsers, numFactors);
    this.itemFactors = Matrix.random(numItems, numFactors);
  }

  train(ratings: UserRating[]): void {
    for (let iter = 0; iter < this.numIterations; iter++) {
      for (const rating of ratings) {
        const { userId, movieId, rating: actualRating } = rating;
        
        // Compute prediction error
        const prediction = this.predict(userId, movieId);
        const error = actualRating - prediction;

        // Update user and item factors
        for (let f = 0; f < this.numFactors; f++) {
          const userFactor = this.userFactors.get(userId, f);
          const itemFactor = this.itemFactors.get(movieId, f);

          this.userFactors.set(
            userId,
            f,
            userFactor + this.learningRate * (error * itemFactor - this.regularization * userFactor)
          );

          this.itemFactors.set(
            movieId,
            f,
            itemFactor + this.learningRate * (error * userFactor - this.regularization * itemFactor)
          );
        }
      }
    }
  }

  predict(userId: number, movieId: number): number {
    let prediction = 0;
    for (let f = 0; f < this.numFactors; f++) {
      prediction += this.userFactors.get(userId, f) * this.itemFactors.get(movieId, f);
    }
    return Math.max(0.5, Math.min(5, prediction));
  }

  getRecommendations(userId: number, movies: Movie[], n: number = 10): Movie[] {
    const predictions = movies.map((movie, movieId) => ({
      movie,
      score: this.predict(userId, movieId)
    }));

    return predictions
      .sort((a, b) => b.score - a.score)
      .slice(0, n)
      .map(p => p.movie);
  }
}