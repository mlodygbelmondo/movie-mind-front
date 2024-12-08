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
        title: "Shared successfully",
        description: "The movie has been shared.",
      });
    } else {
      // Fallback to copying the URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Movie link has been copied to your clipboard.",
      });
    }
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      // User cancelled the share
      return;
    }

    toast({
      title: "Error",
      description: "Failed to share the movie. Please try again.",
      variant: "destructive",
    });
  }
}
