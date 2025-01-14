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
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import Link from "next/link";
import { useMutation } from "@/hooks/use-mutation";
import { APICommands } from "@/lib/api/api-commands";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { toast } = useToast();

  const { trigger: logIn, isMutating: isLoading } = useMutation({
    endpoint: APICommands.logIn,
    params: {},
  });

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginValues) {
    try {
      const result = await logIn(data);

      if (!result.accessToken) {
        throw new Error("Invalid credentials");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/me`,
        {
          headers: {
            Authorization: `Bearer ${result.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occurred while fetching the data.");
      }

      const { id } = await response.json();

      await signIn("credentials", {
        email: data.email,
        name: result.login,
        password: data.password,
        accessToken: result.accessToken,
        id,
        callbackUrl: "/",
      });

      toast({
        title: "Sukces",
        description: "Zalogowano pomyślnie.",
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      toast({
        title: "Coś poszło nie tak",
        description: "Nieprawidłowy adres e-mail lub hasło.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12" />
          </div>
          <CardTitle className="text-3xl">Witaj z powrotem!</CardTitle>
          <CardDescription>
            Zaloguj się do swojego konta, aby kontynuować.
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input placeholder="Hasło" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zaloguj się
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Nie masz jeszcze konta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Zarejestruj się
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
