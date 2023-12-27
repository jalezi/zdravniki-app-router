import HTTPError from './errors/HTTPError';
import ValidationError from './errors/ValidationError';
import { urlCsvSchema } from './schemas';

export const getCsv = async (url: string | URL, revalidate: number = 3600) => {
  const safeUrl = urlCsvSchema.safeParse(url);

  if (safeUrl.success) {
    const csv = await fetch(safeUrl.data, { next: { revalidate } });
    if (csv.ok) {
      return { data: await csv.text(), error: null };
    }

    return {
      data: null,
      error: new HTTPError({
        message: 'Could not fetch CSV',
        code: csv.status,
        context: { error: csv.statusText, url, status: csv.status },
      }),
    };
  }

  throw new ValidationError({
    message: `Invalid URL\n${safeUrl.error.message}`,
    context: { url, ...safeUrl.error },
  });
};
