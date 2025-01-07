"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function FriendRequests() {
  const mockRequests = [
    {
      id: "1",
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
      mutualFriends: 3,
    },
  ];

  return (
    <div className="space-y-4">
      {mockRequests.map((request) => (
        <Card key={request.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{request.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.name}</p>
                <p className="text-sm text-muted-foreground">
                  {request.mutualFriends} wspólnych znajomych
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-green-500">
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-red-500">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
