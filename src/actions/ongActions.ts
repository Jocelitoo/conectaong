"use server";

import { prisma } from "@/lib/database";
import { createOngFormSchema, registerFormSchema } from "@/lib/schema";

export const createOng = async (formData: unknown, userId: string) => {
  try {
    // Verificar se os dados do formulário estão de acordo com os critérios especificados no Zod (importante verificar isso no client e server side)
    const result = createOngFormSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        throw new Error(issue.message);
      });
    }

    if (!result.data) return "Dados não recebidos";

    const {
      name,
      email,
      category,
      description,
      address,
      image,
      instagram,
      itens,
      phone,
      site,
      voluntary,
    } = result.data;

    // Verificar se o nome já está sendo utilizado
    const nameInUse = await prisma.oNG.findUnique({
      where: { name },
    });

    if (nameInUse) throw new Error("Já existe uma ONG com esse nome");

    // Verificar se o nome já está sendo utilizado
    const emailInUse = await prisma.oNG.findUnique({
      where: { email },
    });

    if (emailInUse) throw new Error("Já existe uma ONG com esse email");

    // Criar elemento na base de dados
    if (result.data) {
      await prisma.oNG.create({
        data: {
          name,
          address,
          category,
          description,
          email,
          image,
          itens,
          phone,
          voluntary,
          instagram,
          site,
          user: { connect: { id: userId } },
        },
      });
    }

    return "ONG criada com sucesso";
  } catch (error) {
    throw error;
  }
};

export const editOng = async (formData: unknown, ongId: string) => {
  try {
    // Verificar se os dados do formulário estão de acordo com os critérios especificados no Zod (importante verificar isso no client e server side)
    const result = createOngFormSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        throw new Error(issue.message);
      });
    }

    if (!result.data) return "Dados não recebidos";

    const {
      name,
      email,
      category,
      description,
      address,
      image,
      instagram,
      itens,
      phone,
      site,
      voluntary,
    } = result.data;

    // Verificar se o nome já está sendo utilizado
    const nameInUse = await prisma.oNG.findFirst({
      where: {
        name,
        id: {
          not: ongId,
        },
      },
    });

    if (nameInUse) throw new Error("Já existe uma ONG com esse nome");

    // Verificar se o email já está sendo utilizado
    const emailInUse = await prisma.oNG.findFirst({
      where: {
        email,
        id: {
          not: ongId,
        },
      },
    });

    if (emailInUse) throw new Error("Já existe uma ONG com esse email");

    // Atualizar elemento na base de dados
    if (result.data) {
      await prisma.oNG.update({
        where: { id: ongId },
        data: {
          name,
          address,
          category,
          description,
          email,
          image,
          itens,
          phone,
          voluntary,
          instagram,
          site,
        },
      });
    }

    return "ONG editada com sucesso";
  } catch (error) {
    throw error;
  }
};

export const deleteOng = async (ongId: string, imageId: string) => {
  try {
    // Verificar se a ong realmente existe na base de dados
    const ongExist = await prisma.oNG.findFirst({ where: { id: ongId } });

    if (!ongExist) throw new Error("Nenhuma ONG encontrada");

    // Remover o elemento da base de dados
    await prisma.oNG.delete({ where: { id: ongId } });

    // Remover a imagem do cloudinary
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

    return "ONG removida com sucesso";
  } catch (error) {
    throw error;
  }
};
