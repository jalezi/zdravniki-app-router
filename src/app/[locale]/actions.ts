'use server';

import { getCurrentLocale } from '@/locales/server';

import { defaultsSearchParamsSchema, redirectWithSearchParams } from './utils';

export async function handleFormSubmit(
  _prevState: { message: string },
  formData: FormData
) {
  const locale = getCurrentLocale();
  const type = formData.get('type');
  const page = formData.get('page');
  const pageSize = formData.get('pageSize');
  const defaultParams = defaultsSearchParamsSchema.safeParse({
    page,
    pageSize,
    type,
  });

  if (!defaultParams.success) {
    return { message: 'Invalid params' };
  }

  redirectWithSearchParams(defaultParams.data, locale);
  return { message: 'Redirecting...' };
}
