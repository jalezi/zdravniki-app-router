// middleware.ts
import { NextRequest } from 'next/server';

import { I18nMiddleware, Locales } from './locales/config';
import { ROUTES_TRANSLATIONS } from '../rewrites-redirects.config.mjs';

export function middleware(request: NextRequest) {
  const response = I18nMiddleware(request);

  const url = new URL(request.url);
  const { pathname } = url;
  response.headers.set('x-pathname', pathname);

  const locale = response.headers.get('x-next-locale');
  const localeSegments = ROUTES_TRANSLATIONS[locale as Locales];

  let canonicalPathname = pathname;
  for (const key in localeSegments) {
    if (
      canonicalPathname.includes(
        localeSegments[key as keyof typeof localeSegments]
      )
    ) {
      canonicalPathname = canonicalPathname.replace(
        localeSegments[key as keyof typeof localeSegments],
        key
      );
    }
  }

  response.headers.set('x-canonical-pathname', canonicalPathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
