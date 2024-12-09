"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Actor } from "@/lib/types";

interface ActorCardProps {
  actor: Actor;
}

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link
      href={`/actors/${actor.id}`}
      className="block w-[250px] overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <Card className="h-full">
        <CardHeader className="text-center">
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={actor.imageUrl} alt={actor.name} />
            <AvatarFallback>{actor.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg mt-2">{actor.name}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {actor.bio}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Known for: {actor.knownFor.length} films
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
