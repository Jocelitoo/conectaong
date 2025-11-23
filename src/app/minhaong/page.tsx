import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CreateOngForm } from "../../components/CreateOngForm";
import { EditOngForm } from "@/components/EditOngForm";
import { prisma } from "@/lib/database";

const MyOng = async () => {
  const session = await getServerSession(authOptions); // Pegar os dados do usuário logado

  // Se session não puxar os dados do usuário logado, redirecionar para a home
  if (!session) {
    location.replace("/");

    return;
  }

  // Pegar a ong na base de dados pois quando editada / criada precisamos do valor editado / criado
  const ong = await prisma.oNG.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <main className="grow">
      {ong ? <EditOngForm ong={ong} /> : <CreateOngForm />}
    </main>
  );
};

export default MyOng;
