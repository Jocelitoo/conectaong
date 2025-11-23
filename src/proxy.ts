import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET!;

// Escolher rotas em que o middleware sera executado
export const config = {
  matcher: [
    "/minhaong/:path*",
    "/ongs/:path*",
    "/usuarios/:path*",
    "/login/:path*",
    "/registrar-se/:path*",
  ],
};

export const proxy = async (request: NextRequest) => {
  // Pegar o token (name, email, ...) do usuário logado, null se estiver deslogado
  const token = await getToken({ req: request, secret });

  // Código executado se usuário estiver deslogado
  if (!token) {
    if (
      request.nextUrl.pathname.startsWith("/minhaong") ||
      request.nextUrl.pathname.startsWith("/ongs") ||
      request.nextUrl.pathname.startsWith("/usuarios")
    ) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (token) {
    // Bloquear as rotas que somente o user admin pode ter acesso
    if (
      request.nextUrl.pathname.startsWith("/ongs") ||
      request.nextUrl.pathname.startsWith("/usuarios")
    ) {
      if (token.role !== "Admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Bloquear usuários logados de entrarem na página de login / registro
  if (token) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/registrar-se")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Se usuário estiver logado, segue o fluxo normal
  return NextResponse.next();
};
