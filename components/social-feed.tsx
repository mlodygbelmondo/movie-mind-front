"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MovieCard } from "@/components/movie-card";
import { mockSocialPosts } from "@/lib/mock";

export function SocialFeed() {
  return (
    <div className="space-y-8">
      {mockSocialPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {post.user.name}
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
