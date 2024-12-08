"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FriendsList } from "@/components/social/friends-list";
import { FriendRequests } from "@/components/social/friend-requests";
import { ActivityFeed } from "@/components/social/activity-feed";

export default function SocialPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Social</h1>
        <p className="text-muted-foreground">
          Connect with friends and discover what they're watching.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ActivityFeed />
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="friends" className="flex-1">Friends</TabsTrigger>
              <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="friends">
              <FriendsList />
            </TabsContent>
            <TabsContent value="requests">
              <FriendRequests />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}