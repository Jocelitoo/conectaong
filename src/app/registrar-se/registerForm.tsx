"use client";

import { createUser } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const RegistrarForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);

    createUser(values)
      .then((response) => {
        form.reset(); // Limpa todos os campos do formulário
        toast(response, {
          style: { backgroundColor: "#07bc0c", color: "#000" },
        });
        location.assign("/login"); // Navegar para o link especificado
      })
      .catch((error) => {
        toast(error.message, {
          style: { backgroundColor: "#e74c3c", color: "#000" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border space-y-4 p-4 rounded-md w-full max-w-lg"
      >
        <h1 className="font-bold text-2xl text-center">Registrar-se</h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription className="sr-only">Nome</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha:</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Confirmar senha
              </FormDescription>
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
            Registrar-se
          </Button>
        )}
      </form>
    </Form>
  );
};
