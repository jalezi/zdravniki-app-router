// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

import { defaultsSearchParamsSchema } from './app/[locale]/utils';
import { DEFAULT_SEARCH_PARAMS } from './lib/schemas';
import { I18nMiddleware, Locales } from './locales/config';
import { ROUTES_TRANSLATIONS } from '../rewrites-redirects.config.mjs';

function checkSearchParams(url: URL) {
  const { pathname, searchParams: params } = url;
  const safeSearchParams = defaultsSearchParamsSchema.safeParse({
    type: params.get('type') ?? 'all',
    accepts: params.get('accepts') ?? 'all',
    page: params.get('page') ?? '1',
    pageSize: params.get('pageSize') ?? '12',
  });

  if (safeSearchParams.success) {
    return;
  }

  const newSearchParams = new URLSearchParams();
  for (const issue of safeSearchParams.error.issues) {
    const issuePath = issue.path.join('.') ?? '';
    if (issuePath) {
      newSearchParams.set(
        issuePath,
        `${DEFAULT_SEARCH_PARAMS[issuePath as keyof typeof DEFAULT_SEARCH_PARAMS]}`
      );
    }
  }

  const newUrl = new URL(pathname, url);
  newUrl.search = newSearchParams.toString();
  return newUrl;
}

export function middleware(request: NextRequest) {
  const response = I18nMiddleware(request);

  const url = new URL(request.url);
  const { pathname } = url;

  if (['/sl/', '/en/', '/it/'].includes(pathname)) {
    const newUrl = checkSearchParams(url);
    if (newUrl) {
      return NextResponse.redirect(newUrl, 302);
    }
  }

  response.headers.set('x-pathname', pathname);

  const locale = response.headers.get('x-next-locale');
  const localeSegments = ROUTES_TRANSLATIONS[locale as Locales];

  let canonicalPathname = pathname;
  for (const key in localeSegments) {
    const segment = localeSegments[key as keyof typeof localeSegments];
    if (canonicalPathname.startsWith(`/${locale}/${segment}/`)) {
      canonicalPathname = canonicalPathname.replace(segment, key);
      break;
    }
  }

  response.headers.set('x-canonical-pathname', canonicalPathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
