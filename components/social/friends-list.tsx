"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@/hooks/use-query";
import { APIQueries } from "@/lib/api/api-queries";

type OwnProps = {
  userId?: string;
};

export type Friend = {
  id: string;
  name: string;
  mutualFriends?: number;
};

export function FriendsList({ userId }: OwnProps) {
  const { data, isLoading } = useQuery({
    endpoint: APIQueries.getFriends,
    params: {
      userId: userId || "",
    },
  });

  if (isLoading || !data) return <div></div>;

  const friends = data as Friend[];

  return (
    <div className="space-y-4">
      {friends.map((friend, i) => (
        <Card key={i}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{friend.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {friends.length === 0 && (
        <p className="text-muted-foreground text-center py-8">Brak znajomych</p>
      )}
    </div>
  );
}
