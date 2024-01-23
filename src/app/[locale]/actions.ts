'use server';

import { getCurrentLocale } from '@/locales/server';

import { defaultsSearchParamsSchema, redirectWithSearchParams } from './utils';

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
