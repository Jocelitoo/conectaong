"use client";

import { loginFormSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);

    // Fazer login
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((response) => {
        if (response?.ok) {
          location.replace("/"); // Redireciona para a home
        } else {
          toast(response?.error || "Erro no login", {
            style: { backgroundColor: "#e74c3c", color: "#000" },
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border space-y-4 p-4 rounded-md w-full max-w-lg"
      >
        <h1 className="font-bold text-2xl text-center">Login</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription className="sr-only">Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className="sr-only">Senha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <Button
            size={"lg"}
            type="button"
            disabled
            className="w-full bg-blue-400 text-black hover:bg-blue-600 focus-visible:bg-blue-600"
          >
            <LoaderCircle className="animate-spin" />
            Carregando...
          </Button>
        ) : (
          <Button
            size={"lg"}
            type="submit"
            className="cursor-pointer w-full bg-blue-400 text-black hover:bg-blue-600 focus-visible:bg-blue-600"
          >
            Login
          </Button>
        )}

        <Link href={"registrar-se"} className="block text-center text-[14px]">
          Não tem uma conta ?{" "}
          <span className="underline font-semibold">Registrar-se</span>
        </Link>
      </form>
    </Form>
  );
};
