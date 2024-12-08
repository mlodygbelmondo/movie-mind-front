"use client";

import { User, FriendRequest, FriendStatus } from '@/lib/types';

export class FriendService {
  private friends: Map<string, Set<string>>;
  private pendingRequests: Map<string, FriendRequest[]>;

  constructor() {
    this.friends = new Map();
    this.pendingRequests = new Map();
  }

  sendFriendRequest(fromUser: User, toUser: User): void {
    const request: FriendRequest = {
      id: `fr_${Date.now()}`,
      fromUserId: fromUser.id,
      toUserId: toUser.id,
      status: FriendStatus.PENDING,
      timestamp: new Date().toISOString()
    };

    const userRequests = this.pendingRequests.get(toUser.id) || [];
    this.pendingRequests.set(toUser.id, [...userRequests, request]);
  }

  acceptFriendRequest(request: FriendRequest): void {
    // Update request status
    request.status = FriendStatus.ACCEPTED;

    // Add to friends list
    this.addFriend(request.fromUserId, request.toUserId);

    // Remove from pending requests
    this.removePendingRequest(request);
  }

  rejectFriendRequest(request: FriendRequest): void {
    request.status = FriendStatus.REJECTED;
    this.removePendingRequest(request);
  }

  private addFriend(userId1: string, userId2: string): void {
    // Add to both users' friend lists
    const friends1 = this.friends.get(userId1) || new Set();
    const friends2 = this.friends.get(userId2) || new Set();

    friends1.add(userId2);
    friends2.add(userId1);

    this.friends.set(userId1, friends1);
    this.friends.set(userId2, friends2);
  }

  private removePendingRequest(request: FriendRequest): void {
    const userRequests = this.pendingRequests.get(request.toUserId) || [];
    this.pendingRequests.set(
      request.toUserId,
      userRequests.filter(r => r.id !== request.id)
    );
  }

  getFriends(userId: string): User[] {
    return Array.from(this.friends.get(userId) || [])
      .map(friendId => this.getUserById(friendId))
      .filter(Boolean) as User[];
  }

  getPendingRequests(userId: string): FriendRequest[] {
    return this.pendingRequests.get(userId) || [];
  }

  private getUserById(userId: string): User | undefined {
    // This would typically fetch from a database
    // For now, return mock data
    return {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`,
      avatar: `https://images.unsplash.com/photo-${userId}?w=100&auto=format`
    };
  }
}