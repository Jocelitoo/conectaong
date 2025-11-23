import { prisma } from "@/lib/database";
import { User2 } from "lucide-react";
import { DeleteUserButton } from "./DeleteUserButton";

const Users = async () => {
  // Puxar todos os usuários, com exceção do usuário Admin
  const users = await prisma.user.findMany({
    where: { NOT: { role: "Admin" } },
    include: { ong: true },
  });

  return (
    <main className="grow py-3 px-2 sm:px-8 lg:px-20">
      <div className="space-y-4 grid sm:grid-cols-2 gap-4">
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center border rounded-lg p-2"
            >
              <div className="flex gap-1">
                <p>
                  <User2 />
                </p>

                <p>{user?.name}</p>
              </div>

              <p>{user?.email}</p>

              <DeleteUserButton ongId={user?.id} imageId={user?.ong?.id} />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Users;
