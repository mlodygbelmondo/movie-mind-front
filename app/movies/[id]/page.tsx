import MovieDetailsClient from "@/components/movies/movie-details-client";
import { mockMovies } from "@/lib/mock";

export const generateStaticParams = async () => {
  return mockMovies.map((movie) => ({
    id: movie.id,
  }));
};

export default function MovieDetails({ params }: { params: { id: string } }) {
  return <MovieDetailsClient params={params} />;
}
