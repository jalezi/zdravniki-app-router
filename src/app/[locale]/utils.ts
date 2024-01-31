import { RedirectType, redirect } from 'next/navigation';

import { z } from 'zod';

import { DEFAULT_SEARCH_PARAMS, doctorsQueryInputSchema } from '@/lib/schemas';
import { getSiteUrl } from '@/lib/utils';

export const defaultsSearchParamsSchema = doctorsQueryInputSchema.default(
  DEFAULT_SEARCH_PARAMS
);

export type DefaultsSearchParams = z.infer<typeof defaultsSearchParamsSchema>;

export function redirectWithSearchParams(
  params: DefaultsSearchParams,
  locale: string
) {
  const url = new URL('/', getSiteUrl());
  url.searchParams.set('type', params.type);
  url.searchParams.set('accepts', params.accepts);
  url.searchParams.set('page', params.page.toString());
  url.searchParams.set('pageSize', params.pageSize.toString());

  redirect(`/${locale}/${url.search}`, RedirectType.replace);
}
