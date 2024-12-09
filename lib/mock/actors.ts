import { faker } from "@faker-js/faker";
import { Actor } from "@/lib/types";
import { mockMovies } from "./movies";

// Set seed for consistent data
faker.seed(123);

export function generateMockActor(): Actor {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    bio: faker.lorem.paragraphs(2),
    imageUrl: faker.image.avatar(),
    birthDate: faker.date
      .between({ from: "1950-01-01", to: "1995-12-31" })
      .toISOString()
      .split("T")[0],
    birthPlace: `${faker.location.city()}, ${faker.location.country()}`,
    knownFor: faker.helpers.arrayElements(mockMovies, { min: 3, max: 6 }),
  };
}

// Generate 50 mock actors
export const mockActors = Array.from({ length: 50 }, generateMockActor);
