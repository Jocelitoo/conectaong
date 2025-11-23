"use client";

import { OngProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";

interface HomeElementsProps {
  ongs: OngProps[];
}

export const HomeElements = ({ ongs }: HomeElementsProps) => {
  const [search, setSearch] = useState(""); // Texto digitado para pesquisar produtos

  // Filtrar produtos com base na busca
  const filteredOngs = useMemo(() => {
    return ongs.filter((ong) => {
      if (
        ong.name.toUpperCase().includes(search.toUpperCase()) ||
        ong.description.toUpperCase().includes(search.toUpperCase()) ||
        ong.category.toUpperCase().includes(search.toUpperCase())
      ) {
        return ong;
      }
    });
  }, [ongs, search]);

  return (
    <>
      <div className="text-end">
        <Input
          type="text"
          placeholder="Pesquisar ONG"
          onChange={(e) => setSearch(e.target.value)}
          className="w-fit"
        />
      </div>

      {filteredOngs.length >= 1 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {filteredOngs.map((ong, index) => {
            return (
              <Link key={index} href={`ong/${ong.id}`}>
                <div className="flex flex-col h-full border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                  <div className="w-full space-y-2">
                    <div className="aspect-square overflow-hidden relative w-full bg-slate-200">
                      <Image
                        src={ong.image.url}
                        alt="imagem da ong"
                        fill
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col grow justify-between p-4 text-center space-y-2">
                    <p className="font-bold text-xl">{ong.name}</p>

                    <p className="line-clamp-2">{ong.description}</p>

                    <p>{ong.address}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-xl ">Nenhuma ong encontrada</p>
      )}
    </>
  );
};
