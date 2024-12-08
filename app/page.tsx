"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieRecommendations } from "@/components/movie-recommendations";
import { SocialFeed } from "@/components/social-feed";
import { mockMovies } from "@/lib/mock";
import { MovieCard } from "@/components/movie-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Welcome to MovieMind</h1>
        <p className="text-muted-foreground">
          Discover great movies through personalized recommendations and your
          social circle.
        </p>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="social">Social Feed</TabsTrigger>
          <TabsTrigger value="all">All Films</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <MovieRecommendations />
        </TabsContent>
        <TabsContent value="social" className="space-y-4">
          <SocialFeed />
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Search films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      </Tabs>
    </div>
  );
}
