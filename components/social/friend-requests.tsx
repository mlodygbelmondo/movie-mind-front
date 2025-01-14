"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@/hooks/use-query";
import { APIQueries } from "@/lib/api/api-queries";
import { Check, X } from "lucide-react";
import { Friend } from "./friends-list";
import { useSessionData } from "@/hooks/use-session-data";

export function FriendRequests() {
  const { accessToken, userId } = useSessionData();

  const { data, isLoading, mutate } = useQuery({
    endpoint: APIQueries.getPendingFriendRequests,
    params: {
      userId: userId || "",
    },
  });

  const acceptRequest = async (friendId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}/accept`,
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

  const rejectRequest = async (friendId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}/reject`,
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

  const requests = data as Friend[];

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{request.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => void acceptRequest(request.id)}
                variant="ghost"
                size="icon"
                className="text-green-500"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => void rejectRequest(request.id)}
                variant="ghost"
                size="icon"
                className="text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {requests.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Brak zaproszeń do znajomych
        </p>
      )}
    </div>
  );
}
