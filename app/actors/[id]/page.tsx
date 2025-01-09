import { mockActors } from "@/lib/mock";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "@/components/movie-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { KnownFor } from "@/components/actor/known-for";
export const generateStaticParams = async () => {
  return mockActors.map((actor) => ({
    id: actor.id,
  }));
};

export default function ActorProfile({ params }: { params: { id: string } }) {
  const actor = mockActors.find((a) => a.id === params.id);

  if (!actor) {
    return <div>Aktor nie znaleziony</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Actor Header */}
      <div className="flex items-start gap-6">
        <Avatar className="w-32 h-32">
          <AvatarFallback>{actor.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
            <p className="text-muted-foreground">
              Urodzony {actor.birthDate} w {actor.birthPlace}
            </p>
          </div>
          <p className="max-w-2xl text-muted-foreground">{actor.bio}</p>
        </div>
      </div>

      {/* Known For Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Wystąpił w: </h2>
        <Card>
          <CardContent className="p-4">
            <ScrollArea>
              <KnownFor />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
