"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

type OwnProps = {
  friends: string[];
};

export function FriendsList({ friends }: OwnProps) {
  return (
    <div className="space-y-4">
      {friends.map((name, i) => (
        <Card key={i}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {(Math.random() * 7 + 6).toFixed()} wspólnych filmów
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
