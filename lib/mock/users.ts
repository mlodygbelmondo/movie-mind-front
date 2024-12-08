import { faker } from "@faker-js/faker";
import { User } from "@/lib/types";
import { GENRES } from "./movies";

export function generateMockUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
    favoriteGenres: faker.helpers.arrayElements(GENRES, { min: 2, max: 4 }),
  };
}

// Generate 25 mock users
export const mockUsers: User[] = Array.from({ length: 25 }, generateMockUser);
