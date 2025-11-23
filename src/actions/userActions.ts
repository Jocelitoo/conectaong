"use server";

import { prisma } from "@/lib/database";
import { registerFormSchema } from "@/lib/schema";
import bcrypt from "bcrypt";

export const createUser = async (formData: unknown) => {
  try {
    // Verificar se os dados do formulário estão de acordo com os critérios especificados no Zod (importante verificar isso no client e server side)
    const result = registerFormSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        throw new Error(issue.message);
      });
    }

    if (!result.data) return "Dados não recebidos";

    const { name, email, password } = result.data;

    // Verificar se o nome já está sendo utilizado
    const nameInUse = await prisma.user.findUnique({
      where: { name },
    });

    if (nameInUse) throw new Error("Já existe um usuário com esse nome");

    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário na base de dados
    if (result.data) {
      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          role: "Ong",
        },
      });
    }

    return "Usuário criado com sucesso";
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (
  userId: string,
  imageId: string | undefined
) => {
  try {
    // Verificar se a usuário realmente existe na base de dados
    const userExist = await prisma.user.findFirst({ where: { id: userId } });

    if (!userExist) throw new Error("Usuário não encontrado");

    // Confirmar que o usuário não é o admin
    if (userExist.role === "Admin")
      throw new Error("O admin não pode ser removido");

    // Remover o usuário na base de dados
    await prisma.user.delete({ where: { id: userId } });

    // Caso haja, a ong vinculada ao usuário é removida automaticamente, mas precisamos remover a imagem do cloudinary
    if (imageId) {
      const data = {
        imageId: imageId,
      };

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });
    }

    return "Usuário removido com sucesso";
  } catch (error) {
    throw error;
  }
};
