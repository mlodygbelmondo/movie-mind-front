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
import { mockActors } from "@/lib/mock";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoviesInSearch } from "./movies-in-search";
import { Input } from "./ui/input";

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
          <span className="text-[10px]">⌘</span>K / Ctrl K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          placeholder="Wyszukaj..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="m-3 mb-5 h-10 w-[400px]"
        />
        <CommandList className="">
          <CommandEmpty>Nie znaleziono.</CommandEmpty>
          <MoviesInSearch query={query} onSelect={onSelect} />
          {filteredActors.length > 0 && (
            <CommandGroup heading="Aktorzy">
              {filteredActors.slice(0, 4).map((actor) => (
                <CommandItem
                  key={actor.id}
                  onSelect={() => onSelect("actor", actor.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-10 w-10">
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
