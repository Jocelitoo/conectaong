import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { DeleteOngButton } from "./DeleteOngButton";

const Ongs = async () => {
  const ongs = await prisma.oNG.findMany();

  return (
    <main className="grow py-3 px-2 sm:px-8 lg:px-20">
      <div className="space-y-4 grid sm:grid-cols-2 gap-4">
        {ongs.map((ong, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center border rounded-lg p-2"
            >
              <div className="aspect-square overflow-hidden relative w-[100px] bg-slate-200 rounded-lg">
                <Image
                  src={ong?.image.url || ""}
                  alt="imagem da ong"
                  fill
                  className="w-full h-full"
                />
              </div>

              <p>{ong?.name}</p>

              <DeleteOngButton ongId={ong?.id} imageId={ong?.image.id} />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Ongs;
