"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { mockMovies, mockActors } from "@/lib/mock";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActors = mockActors.filter((actor) =>
    actor.name.toLowerCase().includes(query.toLowerCase())
  );

  const onSelect = (type: "movie" | "actor", id: string) => {
    setOpen(false);
    router.push(`/${type}s/${id}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Wyszukaj...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Wyszukaj filmy i aktorów..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>Nie znaleziono.</CommandEmpty>
          {filteredMovies.length > 0 && (
            <CommandGroup heading="Filmy">
              {filteredMovies.slice(0, 4).map((movie) => (
                <CommandItem
                  key={movie.id}
                  onSelect={() => onSelect("movie", movie.id)}
                  className="flex items-center gap-2"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{movie.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredActors.length > 0 && (
            <CommandGroup heading="Aktorzy">
              {filteredActors.slice(0, 4).map((actor) => (
                <CommandItem
                  key={actor.id}
                  onSelect={() => onSelect("actor", actor.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={actor.imageUrl} alt={actor.name} />
                    <AvatarFallback>{actor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{actor.name}</p>
                    <p className="text-xs text-muted-foreground">Aktor</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
