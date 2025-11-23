import { HeartHandshake } from "lucide-react";

export const Footer = async () => {
  return (
    <footer className="bg-blue-200 py-4 sm:py-8">
      <div className="flex gap-1 justify-center">
        <HeartHandshake className="text-blue-400" />
        <p>ConectaONG</p>
      </div>
    </footer>
  );
};
