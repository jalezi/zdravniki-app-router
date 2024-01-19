import { ValidationError } from '@/lib/errors';

import { pageNumberAndSizeSchema } from '../schemas';

export function getStartAndEnd(
  page: number,
  pageSize: number
): { start: number; end: number } {
  const parsedParams = pageNumberAndSizeSchema.safeParse({ page, pageSize });

  if (!parsedParams.success) {
    throw new ValidationError({
      message: parsedParams.error.message,
      context: { ...parsedParams.error },
    });
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return { start, end };
}

export function getPageSlice<T>(
  doctors: T[],
  params: { page: number; pageSize: number }
): T[] {
  const parsedParams = pageNumberAndSizeSchema.safeParse({ ...params });

  if (!parsedParams.success) {
    throw new ValidationError({
      message: parsedParams.error.message,
      context: { ...parsedParams.error },
    });
  }

  const { page, pageSize } = params;
  const { start, end } = getStartAndEnd(page, pageSize);

  return doctors.slice(start, end);
}
