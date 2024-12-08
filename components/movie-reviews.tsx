"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";

const reviewSchema = z.object({
  content: z.string().min(10, {
    message: "Review must be at least 10 characters long",
  }),
  rating: z.number().min(1).max(5),
});

type ReviewValues = z.infer<typeof reviewSchema>;

interface MovieReviewsProps {
  movieId: string;
}

export function MovieReviews({ movieId }: MovieReviewsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  const mockReviews = [
    {
      id: "1",
      user: {
        name: "Alice Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      },
      rating: 4.5,
      content:
        "An absolutely stunning film that keeps you on the edge of your seat!",
      timestamp: "2024-03-20T10:00:00Z",
      likes: 24,
      comments: 3,
    },
  ];

  async function onSubmit(data: ReviewValues) {
    setIsSubmitting(true);
    try {
      // Add your review submission logic here
      console.log({ ...data, movieId });
      toast({
        title: "Success",
        description: "Your review has been posted.",
      });
      form.reset();
      setSelectedRating(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Write your review... (minimum 10 characters)"
              {...form.register("content")}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      rating <= selectedRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedRating(rating);
                      form.setValue("rating", rating);
                    }}
                  />
                ))}
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Review"}
              </Button>
            </div>
            {form.formState.errors.content && (
              <p className="text-sm text-red-500 mt-2">
                {form.formState.errors.content.message}
              </p>
            )}
            {form.formState.errors.rating && (
              <p className="text-sm text-red-500 mt-2">
                Please select a rating
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.user.name}</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(review.timestamp).format("MM/DD/YYYY")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{review.content}</p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{review.comments}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
