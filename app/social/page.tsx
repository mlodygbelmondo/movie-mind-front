"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FriendsList } from "@/components/social/friends-list";
import { FriendRequests } from "@/components/social/friend-requests";
import { ActivityFeed } from "@/components/social/activity-feed";
import { AddFriend } from "@/components/social/add-friend";

export default function SocialPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Social</h1>
        <p className="text-muted-foreground">
          Sprawdź co spodobało się Twoim znajomym!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ActivityFeed />
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="friends">Znajomi</TabsTrigger>
              <TabsTrigger value="requests">Zaproszenia</TabsTrigger>
              <TabsTrigger value="add">Zaproś</TabsTrigger>
            </TabsList>
            <TabsContent value="friends">
              <FriendsList />
            </TabsContent>
            <TabsContent value="requests">
              <FriendRequests />
            </TabsContent>
            <TabsContent value="add">
              <AddFriend />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
