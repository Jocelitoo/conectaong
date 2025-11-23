import { ChevronDownIcon, HeartHandshakeIcon, User2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogoutButton } from "./LogoutButton";

export const Header = async () => {
  const session = await getServerSession(authOptions); // Pegar os dados do usuário logado

  return (
    <header className="flex justify-between items-center bg-blue-200 py-3 px-2 sm:px-8 lg:px-20">
      <Link href={"/"} className="flex gap-1">
        <HeartHandshakeIcon className="text-blue-400" />
        <p>ConectaONG</p>
      </Link>

      {session?.user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size={"lg"}
              className="cursor-pointer border border-black rounded-full hover:bg-gray-600"
            >
              <User2 />
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-32 px-1 py-1">
            <div className="grid gap-2">
              {session.user.role === "Admin" ? (
                <>
                  <Link
                    href={"ongs"}
                    className="rounded-lg p-2 border transition-colors duration-300 hover:bg-blue-200 "
                  >
                    Ver ONGS
                  </Link>

                  <Link
                    href={"usuarios"}
                    className="rounded-lg p-2 border transition-colors duration-300 hover:bg-blue-200 "
                  >
                    Ver usuários
                  </Link>
                </>
              ) : (
                <Link
                  href={"minhaong"}
                  className="rounded-lg p-2 border transition-colors duration-300 hover:bg-blue-200 "
                >
                  Minha ONG
                </Link>
              )}

              <LogoutButton />
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          size={"lg"}
          asChild
          className="text-black bg-blue-400 hover:bg-blue-600"
        >
          <Link href={"login"}>Login</Link>
        </Button>
      )}
    </header>
  );
};
