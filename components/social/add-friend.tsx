"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { APIQueries } from "@/lib/api/api-queries";
import { useQuery } from "@/hooks/use-query";
import { Friend } from "./friends-list";
import { useSessionData } from "@/hooks/use-session-data";

export function AddFriend() {
  const [searchQuery, setSearchQuery] = useState("");

  const { accessToken, userId } = useSessionData();

  const { data, isLoading, mutate } = useQuery({
    endpoint: APIQueries.getNonFriends,
    params: {
      userId: userId || "",
    },
  });

  const addFriend = async (friendId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add friend");
      }

      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !data) return <div></div>;

  const users = data as Friend[];

  const filteredUsers = users.filter((user) =>
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
        {filteredUsers.slice(0, 50).map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <Button
                onClick={() => void addFriend(user.id)}
                variant="secondary"
                size="sm"
                className="space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Zaproś</span>
              </Button>
            </CardContent>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Nie znaleziono użytkowników
          </div>
        )}
      </div>
    </div>
  );
}
