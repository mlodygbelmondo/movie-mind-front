"use client";

import { Movie } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

export async function shareMovie(movie: Movie) {
  const shareData = {
    title: movie.title,
    text: `Check out "${movie.title}" on MovieMind!`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      // Use native share if available
      await navigator.share(shareData);
      toast({
        title: "Udostępniono pomyślnie",
        description: "Film został udostępniony.",
      });
    } else {
      // Fallback to copying the URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Skopiowano link",
        description: "Link do filmu został skopiowany do twojego schowka.",
      });
    }
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      // User cancelled the share
      return;
    }

    toast({
      title: "Coś poszło nie tak",
      description: "Nie udało się udostępnić filmu. Spróbuj ponownie.",
      variant: "destructive",
    });
  }
}
