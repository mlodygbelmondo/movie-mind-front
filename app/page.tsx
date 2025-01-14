"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieRecommendations } from "@/components/movie-recommendations";
import { mockActors } from "@/lib/mock";
import { MovieCard } from "@/components/movie-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ActorCard } from "@/components/actor-card";
import { APIQueries } from "@/lib/api/api-queries";
import { useQuery } from "@/hooks/use-query";
import { Movie } from "@/lib/types";
import { useSessionData } from "@/hooks/use-session-data";

type Data = {
  recommendations_section:
    | {
        movie: Movie;
        recommendations: Movie[];
      }
    | undefined;
  popular_movies_section: Movie[];
  friends_activity_section: {
    friend_name: string;
    movie: Movie;
    action: string;
  }[];
};

export default function Home() {
  const { accessToken, userId } = useSessionData();

  const [movieSearchQuery, setMovieSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    endpoint: APIQueries.getMainPageData,
    params: {
      userId: userId || "",
    },
    accessToken,
  });

  const { data: allMovies, isLoading: allMoviesLoading } = useQuery({
    endpoint: APIQueries.getAllMovies,
    params: {
      search: movieSearchQuery,
    },
    accessToken,
  });

  const [actorSearchQuery, setActorSearchQuery] = useState("");

  if (isLoading || !data) return <div>Ładowanie...</div>;

  const {
    recommendations_section,
    popular_movies_section,
    friends_activity_section,
  } = data as Data;

  const filteredActors = mockActors.filter((actor) =>
    actor.name.toLowerCase().includes(actorSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Witaj w MovieMind</h1>
        <p className="text-muted-foreground">
          Znajdź swoje ulubione filmy i aktorów oraz podziel się nimi ze
          znajomymi!
        </p>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Główna</TabsTrigger>
          <TabsTrigger value="all-films">Katalog filmów</TabsTrigger>
          <TabsTrigger value="all-actors">Aktorzy</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <MovieRecommendations
            recommendations_section={recommendations_section}
            popularMovies={popular_movies_section}
            friendsActivity={friends_activity_section}
          />
        </TabsContent>
        <TabsContent value="all-films" className="space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Szukaj filmów..."
              value={movieSearchQuery}
              onChange={(e) => setMovieSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Card>
              <CardContent className="p-4">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {allMoviesLoading ? (
                      <div>Ładowanie...</div>
                    ) : (allMovies as Movie[]).length > 0 ? (
                      (allMovies as Movie[]).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <div className="text-muted-foreground pt-4 text-center w-full">
                        Nie znaleziono filmów
                      </div>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="all-actors" className="space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Wyszukaj aktorów..."
              value={actorSearchQuery}
              onChange={(e) => setActorSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Card>
              <CardContent className="p-4">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {filteredActors.map((actor) => (
                      <ActorCard key={actor.id} actor={actor} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
