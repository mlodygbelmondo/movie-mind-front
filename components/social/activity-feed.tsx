"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MovieCard } from "@/components/movie-card";
import { mockSocialPosts } from "@/lib/mock";
import { Movie } from "@/lib/types";

interface OwnProps {
  posts: {
    friend_name: string;
    movie: Movie;
    action: string;
  }[];
}

export function ActivityFeed({ posts }: OwnProps) {
  return (
    <div className="space-y-6">
      {posts.map((post, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{post.friend_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {post.friend_name}
                </p>
                <p className="text-sm text-muted-foreground">{post.action}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pl-12">
              <MovieCard movie={post.movie} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
