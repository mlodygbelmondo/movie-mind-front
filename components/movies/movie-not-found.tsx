"use client";

import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function MovieNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <FileQuestion className="h-20 w-20 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Movie Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn't find the movie you're looking for. It might have been
            removed or the link could be incorrect.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="default">Return Home</Button>
          </Link>
          <Link href="/movies">
            <Button variant="outline">Browse Movies</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
