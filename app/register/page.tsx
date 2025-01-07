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
import * as z from "zod";
import { APICommands } from "@/lib/api/api-commands";
import { useMutation } from "@/hooks/use-mutation";
import { signIn } from "next-auth/react";

const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Login musi mieć co najmniej 2 znaki",
    }),
    email: z.string().email({
      message: "Proszę podać prawidłowy adres e-mail",
    }),
    password: z.string().min(8, {
      message: "Hasło musi mieć co najmniej 8 znaków",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { toast } = useToast();

  const { trigger: register, isMutating: isLoading } = useMutation({
    endpoint: APICommands.register,
    params: {},
  });

  const { trigger: logIn } = useMutation({
    endpoint: APICommands.logIn,
    params: {},
  });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterValues) {
    try {
      const result = await register({
        login: data.name,
        email: data.email,
        password: data.password,
      });

      if (!result.accessToken) {
        throw new Error("Invalid credentials");
      }

      await signIn("credentials", {
        email: data.email,
        name: data.name,
        password: data.password,
        accessToken: result.accessToken,
        id: result.accessToken,
        callbackUrl: "/",
      });

      toast({
        title: "Sukces",
        description: "Twoje konto zostało utworzone.",
      });
    } catch (error) {
      toast({
        title: "Coś poszło nie tak",
        description: "Coś poszło nie tak. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Film className="h-12 w-12" />
          </div>
          <CardTitle className="text-3xl">Stwórz konto</CardTitle>
          <CardDescription>
            Uzupełnij poniższe dane by stworzyć konto na MovieMind.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan Nowak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres e-mail</FormLabel>
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potwierdź hasło</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Stwórz konto
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Posiadasz już konto?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Zaloguj się
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
