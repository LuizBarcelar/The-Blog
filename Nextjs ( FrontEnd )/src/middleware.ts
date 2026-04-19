import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rotas que SEMPRE devem ser acessíveis (públicas)
  const publicRoutes = ['/login', '/user/new', '/auth/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // 2. Arquivos estáticos (imagens, css, js) - Liberar sempre para o site carregar
  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.');

  // 3. Verifica o Cookie de Sessão
  const cookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';
  const jwtSession = request.cookies.get(cookieName)?.value;

  // LOG de Debug para você acompanhar no terminal
  console.log(`[Middleware] Rota: ${pathname} | Logado: ${!!jwtSession}`);

  // REGRA DE REDIRECIONAMENTO:
  // Se não for um arquivo estático E não for uma rota pública E o usuário NÃO estiver logado...
  if (!isPublicAsset && !isPublicRoute && !jwtSession) {
    // ...manda direto para o login
    console.log(`[Middleware] Redirecionando ${pathname} -> /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Caso contrário, deixa passar
  return NextResponse.next();
}

export const config = {
matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto:
     * 1. /api (rotas de API)
     * 2. /_next/static (arquivos estáticos)
     * 3. /_next/image (otimização de imagem)
     * 4. /uploads (sua pasta do NestJS)
     * 5. /favicon.ico (ícone do navegador)
     */
    '/((?!_next/static|_next/image|uploads|favicon.ico|api).*)',
  ],
};
