import { faker } from "@faker-js/faker";
import {
  Review,
  Comment,
  SocialPost,
  FriendRequest,
  FriendStatus,
} from "@/lib/types";
import { mockUsers } from "./users";
import { mockMovies } from "./movies";

// Set a fixed seed for consistent data generation
faker.seed(123);

// Pre-generate fixed arrays of data instead of generating on demand
const generateFixedSocialPosts = () => {
  const posts: SocialPost[] = [];
  const actions = [
    "watched",
    "reviewed",
    "added to favorites",
    "wants to watch",
  ];

  for (let i = 0; i < 10; i++) {
    const user = mockUsers[i % mockUsers.length];
    const movie = mockMovies[i % mockMovies.length];
    const action = actions[i % actions.length];

    posts.push({
      id: `social-${i + 1}`,
      user,
      movie,
      action,
      timestamp: new Date(2024, 2, i + 1).toISOString(),
      review:
        action === "reviewed"
          ? {
              id: `review-${i + 1}`,
              userId: user.id,
              movieId: movie.id,
              rating: 4,
              content: "This movie was fantastic!",
              timestamp: new Date(2024, 2, i + 1).toISOString(),
              likes: 10,
              comments: [],
            }
          : undefined,
    });
  }
  return posts;
};

export const mockSocialPosts = generateFixedSocialPosts();

export function generateMockComment(): Comment {
  return {
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(mockUsers).id,
    content: faker.lorem.sentences({ min: 1, max: 3 }),
    timestamp: faker.date.recent({ days: 30 }).toISOString(),
    likes: faker.number.int({ min: 0, max: 50 }),
  };
}

export function generateMockReview(): Review {
  return {
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(mockUsers).id,
    movieId: faker.helpers.arrayElement(mockMovies).id,
    rating: Number(faker.number.int({ min: 1, max: 10 }) / 2),
    content: faker.lorem.paragraph(),
    timestamp: faker.date.recent({ days: 60 }).toISOString(),
    likes: faker.number.int({ min: 0, max: 100 }),
    comments: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      generateMockComment
    ),
  };
}

export function generateMockSocialPost(): SocialPost {
  const user = faker.helpers.arrayElement(mockUsers);
  const movie = faker.helpers.arrayElement(mockMovies);
  const action = faker.helpers.arrayElement([
    "watched",
    "reviewed",
    "added to favorites",
    "wants to watch",
  ]);

  return {
    id: faker.string.uuid(),
    user,
    movie,
    action,
    timestamp: faker.date.recent({ days: 30 }).toISOString(),
    review: action === "reviewed" ? generateMockReview() : undefined,
  };
}

export function generateMockFriendRequest(): FriendRequest {
  const fromUser = faker.helpers.arrayElement(mockUsers);
  let toUser;
  do {
    toUser = faker.helpers.arrayElement(mockUsers);
  } while (toUser.id === fromUser.id);

  return {
    id: faker.string.uuid(),
    fromUserId: fromUser.id,
    toUserId: toUser.id,
    status: faker.helpers.arrayElement(Object.values(FriendStatus)),
    timestamp: faker.date.recent({ days: 90 }).toISOString(),
  };
}

// Generate mock data
export const mockComments: Comment[] = Array.from(
  { length: 50 },
  generateMockComment
);
export const mockReviews: Review[] = Array.from(
  { length: 40 },
  generateMockReview
);
export const mockFriendRequests: FriendRequest[] = Array.from(
  { length: 25 },
  generateMockFriendRequest
);
