import { prisma } from "@/lib/database";
import { Globe, Instagram, Mail, MapPinnedIcon, Phone } from "lucide-react";
import Image from "next/image";

interface ProductParamsProps {
  params: Promise<{ id: string }>;
}

const Ong = async ({ params }: ProductParamsProps) => {
  const { id } = await params; // Pegar o id enviado como parâmetro

  const ong = await prisma.oNG.findUnique({ where: { id: id } });

  return (
    <main className="grow py-3 px-2 sm:px-8 lg:px-20 sm:flex  sm:gap-3 ">
      <div className="aspect-square overflow-hidden relative w-full bg-slate-200">
        <Image
          src={ong?.image.url || ""}
          alt="imagem da ong"
          fill
          className="w-full h-full"
        />
      </div>

      <div className="space-y-3 w-full">
        <h1 className="text-2xl font-semibold">{ong?.name}</h1>

        <p>{ong?.description}</p>

        {ong?.itens ? <p>Itens necessitados: {ong?.itens}</p> : <></>}

        {ong?.voluntary ? <p>Voluntários: {ong?.voluntary}</p> : <></>}

        <div className="space-y-1">
          <h2 className="font-semibold">Contato: </h2>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Phone /> {ong?.phone}
            </p>

            <p className="flex items-center gap-2">
              <Mail /> {ong?.email}
            </p>

            {ong?.instagram ? (
              <p className="flex items-center gap-2">
                <Instagram /> {ong?.instagram}
              </p>
            ) : (
              <></>
            )}

            {ong?.site ? (
              <p className="flex items-center gap-2">
                <Globe /> {ong?.site}
              </p>
            ) : (
              <></>
            )}

            <p className="flex items-center gap-2">
              <MapPinnedIcon /> {ong?.address}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ong;
