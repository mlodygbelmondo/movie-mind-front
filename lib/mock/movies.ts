import { faker } from "@faker-js/faker";
import { Movie } from "@/lib/types";

// Set seed for consistent data
faker.seed(123);

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Fantasy",
  "Mystery",
];

export function generateMockMovie(index: number): Movie {
  return {
    id: `movie-${index + 1}`,
    title: faker.helpers.arrayElement([
      `The ${faker.word.adjective()} ${faker.word.noun()}`,
      `${faker.word.adjective()} ${faker.word.noun()}`,
      faker.word.words({ count: { min: 1, max: 3 } }),
    ]),
    description: faker.lorem.paragraph(),
    posterUrl: faker.image.urlLoremFlickr({ category: "movie" }),
    year: faker.number.int({ min: 1990, max: 2024 }),
    genre: faker.helpers.arrayElement(GENRES),
    rating: Number(faker.number.float({ min: 3.0, max: 5.0 }).toFixed(1)),
    director: faker.person.fullName(),
    cast: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () =>
      faker.person.fullName()
    ),
    duration: faker.number.int({ min: 85, max: 180 }),
    trailerUrl: faker.internet.url(),
  };
}

export const mockMovies = Array.from({ length: 30 }, (_, index) =>
  generateMockMovie(index)
);
