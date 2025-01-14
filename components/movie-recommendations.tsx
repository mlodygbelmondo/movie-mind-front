"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/lib/types";

interface MovieRecommendationsProps {
  recommendations_section:
    | {
        movie: Movie;
        recommendations: Movie[];
      }
    | undefined;
  popularMovies: Movie[];
  friendsActivity: {
    friend_name: string;
    movie: Movie;
    action: string;
  }[];
}

export function MovieRecommendations({
  recommendations_section,
  popularMovies,
  friendsActivity,
}: MovieRecommendationsProps) {
  return (
    <div className="space-y-8">
      {recommendations_section ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Ponieważ polubiłeś {recommendations_section.movie.title}
            </CardTitle>
            <CardDescription>
              Sprawdź przygotowaną przez nas listę rekomendacji!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <div className="flex space-x-4 pb-4 pt-2">
                {recommendations_section.recommendations.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>Popularne Filmy</CardTitle>
          <CardDescription>
            Sprawdź filmy, które odniosły spektakularny sukces.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="flex space-x-4 pb-4 pt-2">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wśród Znajomych</CardTitle>
          <CardDescription>
            Zobacz czym w ostatnim czasie interesowali się Twoi znajomi!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {friendsActivity.map((activity, i) => (
                <MovieCard
                  key={`${activity.friend_name}${i}`}
                  movie={activity.movie}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
