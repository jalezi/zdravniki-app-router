import { TIME } from '../constants';
import HTTPError from '../errors/HTTPError';
import ValidationError from '../errors/ValidationError';
import { urlSchema } from '../schemas';

export const getTimestamp = async (url: string | URL) => {
  const safeUrl = urlSchema.safeParse(url);

  if (safeUrl.success) {
    const ts = await fetch(safeUrl.data, {
      next: { revalidate: TIME.ONE_HOUR_IN_SECONDS },
    });
    if (ts.ok) {
      return { data: await ts.text(), error: null };
    }
    return {
      data: null,
      error: new HTTPError({
        message: 'Could not fetch timestamp',
        code: ts.status,
        context: { error: ts.statusText, url, status: ts.status },
      }),
    };
  }

  throw new ValidationError({
    message: `Invalid URL\n${safeUrl.error.message}`,
    context: { url, ...safeUrl.error },
  });
};
