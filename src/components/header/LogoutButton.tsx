"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const logout = () => {
    signOut({ redirect: false }).then(() => {
      location.replace("/"); // Redireciona para a home e atualiza a página para aplicar as alterações de usuário deslogado
    });
  };

  return (
    <Button
      onClick={logout}
      variant={"ghost"}
      className="cursor-pointer justify-start p-2 w-full border transition-colors duration-300 hover:bg-blue-200"
    >
      Sair
    </Button>
  );
};
