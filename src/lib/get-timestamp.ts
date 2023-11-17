import { urlSchema } from './schemas';

export const getTimestamp = async (url: string | URL) => {
  const safeUrl = urlSchema.safeParse(url);

  if (safeUrl.success) {
    const ts = await fetch(safeUrl.data, { next: { revalidate: 3600 } });
    if (ts.ok) {
      return { data: await ts.text(), error: null };
    }
    return { data: null, error: new Error('Could not fetch timestamp') };
  }

  throw new Error(`Invalid URL\n${safeUrl.error.message}`);
};
