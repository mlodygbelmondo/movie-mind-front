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
import { mockMovies } from "@/lib/mock";

export function MovieRecommendations() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Because you liked "Inception"</CardTitle>
          <CardDescription>
            Movies with mind-bending plots and stunning visuals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="flex space-x-4 pb-4 pt-2">
              {mockMovies.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trending Among Friends</CardTitle>
          <CardDescription>
            Popular movies in your social circle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {mockMovies.slice(5, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}