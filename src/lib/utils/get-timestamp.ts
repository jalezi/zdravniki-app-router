import { TIME } from '../constants';
import HTTPError from '../errors/HTTPError';
import ValidationError from '../errors/ValidationError';
import { urlSchema } from '../schemas';

export const getTimestamp = async (
  url: string | URL,
  revalidate: number = TIME.ONE_HOUR_IN_SECONDS,
  tags?: string[]
) => {
  const safeUrl = urlSchema.safeParse(url);

  if (safeUrl.success) {
    const ts = await fetch(safeUrl.data, {
      next: { revalidate, tags },
    });
    if (ts.ok) {
      return { data: await ts.text(), error: null, success: true };
    }
    return {
      data: null,
      error: new HTTPError({
        message: 'Could not fetch timestamp',
        code: ts.status,
        context: { error: ts.statusText, url, status: ts.status },
      }),
      success: false,
    };
  }

  throw new ValidationError({
    message: `Invalid URL\n${safeUrl.error.message}`,
    context: { url, ...safeUrl.error },
  });
};
