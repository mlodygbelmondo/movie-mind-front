"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Film, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Proszę podać prawidłowy adres e-mail.",
  }),
});

type ForgotPasswordSchemaInput = z.infer<typeof forgotPasswordSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordSchemaInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordSchemaInput) {
    setIsLoading(true);
    try {
      // Add your login logic here
      console.log(data);
      toast({
        title: "Wysłano maila.",
        description: "Sprawdź swoją skrzynkę mailową!",
      });
    } catch (error) {
      toast({
        title: "Coś poszło nie tak",
        description: "Niepoprawny e-mail.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12" />
          </div>
          <CardTitle className="text-3xl">Odzyskiwanie hasła</CardTitle>
          <CardDescription>
            Na podany adres e-mail zostanie wysłany link do zresetowania hasła.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adres e-mail"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zresetuj hasło
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">
                  Powrót
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
