import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "No mínimo 8 caracteres"),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "No mínimo 8 caracteres")
      .max(20, { message: "Senha só pode ter no MÁXIMO 20 digitos" }),
    confirmPassword: z
      .string()
      .min(8, "No mínimo 8 caracteres")
      .max(20, { message: "Senha só pode ter no MÁXIMO 20 digitos" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Indica onde o erro será mostrado
  });

export const createOngFormSchema = z.object({
  name: z.string("Nome é obrigatório").min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  description: z.string().min(1, "Descrição é obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  category: z.string().min(1, "Categória é obrigatória"),
  image: z.object({
    url: z.string().min(1, "Escolha uma imagem"),
    id: z.string().min(1, "Escolha uma imagem"),
  }),
  site: z.string(),
  instagram: z.string(),
  voluntary: z.string(),
  itens: z.string(),
});
