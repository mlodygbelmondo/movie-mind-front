"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieRecommendations } from "@/components/movie-recommendations";
import { SocialFeed } from "@/components/social-feed";
import { mockMovies, mockActors } from "@/lib/mock";
import { MovieCard } from "@/components/movie-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ActorCard } from "@/components/actor-card";

export default function Home() {
  const [movieSearchQuery, setMovieSearchQuery] = useState("");
  const [actorSearchQuery, setActorSearchQuery] = useState("");

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(movieSearchQuery.toLowerCase())
  );

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
          <TabsTrigger value="recommendations">Rekomendacje</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="all-films">Katalog filmów</TabsTrigger>
          <TabsTrigger value="all-actors">Aktorzy</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <MovieRecommendations />
        </TabsContent>
        <TabsContent value="social" className="space-y-4">
          <SocialFeed />
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
                    {filteredMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
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
