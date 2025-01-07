import { useQuery } from "@/hooks/use-query";
import { APIQueries } from "@/lib/api/api-queries";
import { type FunctionComponent } from "react";
import { Movie } from "@/lib/types";
import { Genre } from "./movie-card";
import dayjs from "dayjs";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandEmpty } from "cmdk";
interface OwnProps {
  query: string;
  onSelect: (type: "movie" | "actor", id: string) => void;
}

export const MoviesInSearch: FunctionComponent<OwnProps> = ({
  query,
  onSelect,
}) => {
  const { data: allMovies, isLoading: allMoviesLoading } = useQuery({
    endpoint: APIQueries.getAllMovies,
    params: {
      search: query,
    },
  });
  return allMoviesLoading ? (
    <></>
  ) : (
    (allMovies as Movie[]).length > 0 && (
      <CommandGroup heading="Filmy">
        {(allMovies as Movie[]).slice(0, 4).map((movie) => {
          const movieGenre =
            typeof movie.genre === "number" && isFinite(movie.genre)
              ? movie.genre
              : 21;
          const genre = Genre[movieGenre] ?? "Inny";
          return (
            <CommandItem
              key={movie.id}
              onSelect={() => onSelect("movie", movie.id)}
              className="flex items-center gap-2"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{movie.title}</p>
                <p className="text-xs text-muted-foreground">
                  {dayjs(movie.release_date || movie.year).year()} • {genre}
                </p>
              </div>
            </CommandItem>
          );
        })}
      </CommandGroup>
    )
  );
};
