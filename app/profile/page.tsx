"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieCard } from "@/components/movie-card";
import { mockMovies, mockUsers, mockSocialPosts } from "@/lib/mock";
import { useFavorites } from "@/lib/favorites/favorites-context";
import { useWatchLater } from "@/lib/watch-later/watch-later-context";
import { Movie } from "@/lib/types";

// For demo purposes, use the first mock user
const currentUser = mockUsers[0];
// Get user's activity
const userActivity = mockSocialPosts.filter(
  (post) => post.user.id === currentUser.id
);

export default function ProfilePage() {
  const { favorites } = useFavorites();
  const { watchLater } = useWatchLater();

  // Get full movie objects from mock data
  const favoriteMovies = favorites
    .map((id) => mockMovies.find((m) => m.id === id))
    .filter(Boolean) as Movie[];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
          <p className="text-muted-foreground mb-4">{currentUser.bio}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">
                {favorites.length}
              </span>{" "}
              Ulubione
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {watchLater.length}
              </span>{" "}
              Do Obejrzenia
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {userActivity.length}
              </span>{" "}
              Aktywność
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="favorites" className="space-y-6">
        <TabsList>
          <TabsTrigger value="favorites">Ulubione</TabsTrigger>
          <TabsTrigger value="watch-later">Do Obejrzenia</TabsTrigger>
          <TabsTrigger value="activity">Aktywność</TabsTrigger>
          <TabsTrigger value="about">Informacje</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watch-later" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchLater.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {userActivity.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-muted-foreground">
                    {post.action}{" "}
                    <span className="font-medium text-foreground">
                      {post.movie.title}
                    </span>
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <MovieCard movie={post.movie} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Informacje o profilu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">E-mail</h3>
                <p className="text-muted-foreground">{currentUser.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Ulubione gatunki</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.favoriteGenres?.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
