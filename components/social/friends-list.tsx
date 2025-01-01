"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export function FriendsList() {
  const mockFriends = [
    {
      id: "1",
      name: "Sarah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      mutualMovies: 15,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format",
      mutualMovies: 8,
    },
  ];

  return (
    <div className="space-y-4">
      {mockFriends.map((friend) => (
        <Card key={friend.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{friend.name}</p>
                <p className="text-sm text-muted-foreground">
                  {friend.mutualMovies} wspólnych filmów
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
