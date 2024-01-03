'use server';

import { RedirectType, redirect } from 'next/navigation';

import { z } from 'zod';

import { getSiteUrl } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';

import { defaultsSearchParamsSchema } from './utils';

function redirectWithSearchParams(
  params: z.infer<typeof defaultsSearchParamsSchema>,
  locale: string
) {
  const url = new URL('/', getSiteUrl());
  url.searchParams.set('type', params.type);
  url.searchParams.set('page', params.page.toString());
  url.searchParams.set('pageSize', params.pageSize.toString());

  redirect(`/${locale}/${url.search}`, RedirectType.replace);
}

export async function handleFormSubmit(formData: FormData) {
  const locale = getCurrentLocale();
  const type = formData.get('type');
  const page = formData.get('page');
  const pageSize = formData.get('pageSize');
  const defaultParams = defaultsSearchParamsSchema.parse({
    page,
    pageSize,
    type,
  });
  redirectWithSearchParams(defaultParams, locale);
}
