import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

// Configura en qué rutas se aplicará el middleware
export const config = {
  matcher: ['/api/refresh'],
};
