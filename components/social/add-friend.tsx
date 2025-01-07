"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

export function AddFriend() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockSuggestedUsers = [
    {
      id: "3",
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format",
      mutualFriends: 5,
    },
    {
      id: "4",
      name: "Lisa Thompson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      mutualFriends: 2,
    },
  ].filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Wyszukaj użytkowników..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-4">
        {mockSuggestedUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.mutualFriends} wspólnych znajomych
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Zaproś</span>
              </Button>
            </CardContent>
          </Card>
        ))}

        {mockSuggestedUsers.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Nie znaleziono użytkowników
          </div>
        )}
      </div>
    </div>
  );
}
