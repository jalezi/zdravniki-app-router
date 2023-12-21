// middleware.ts
import { NextRequest } from 'next/server';

import { I18nMiddleware } from './locales/config';

export function middleware(request: NextRequest) {
  const response = I18nMiddleware(request);
  const url = new URL(request.url);
  response.headers.set('x-pathname', url.pathname);
  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
