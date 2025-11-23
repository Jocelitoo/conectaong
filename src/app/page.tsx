import { HomeElements } from "@/components/home";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const ongs = await prisma.oNG.findMany();

  return (
    <main className="grow space-y-4 py-3 px-2 sm:px-8 lg:px-20">
      <HomeElements ongs={ongs} />
    </main>
  );
};

export default Home;
