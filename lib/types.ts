export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  year: number;
  genre: string;
  rating: number;
  director?: string;
  cast?: string[];
  duration?: number;
  trailerUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  favoriteGenres?: string[];
}

export interface UserRating {
  userId: number;
  movieId: number;
  rating: number;
  timestamp: string;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface SocialPost {
  id: string;
  user: User;
  movie: Movie;
  action: string;
  timestamp: string;
  review?: Review;
}

export enum FriendStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: FriendStatus;
  timestamp: string;
}