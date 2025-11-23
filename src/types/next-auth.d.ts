import NextAuth from "next-auth";
import { OngProps } from "./types";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    createdAt: string;
    ong: OngProps | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      ong: OngProps | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    createdAt: string;
    ong: OngProps | null;
  }
}
