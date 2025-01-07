import MovieDetailsClient from "@/components/movies/movie-details-client";

export default function MovieDetails({ params }: { params: { id: string } }) {
  return <MovieDetailsClient params={params} />;
}
