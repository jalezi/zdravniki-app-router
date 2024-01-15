import { URL } from 'url';

import { z } from 'zod';

import { TIME } from '@/lib/constants';
import { DOCTORS_TS_URL, INSTITUTIONS_TS_URL } from '@/lib/constants/url';
import { fetchTimestamp } from '@/lib/utils';

import { publicProcedure, router } from '../../trpc';

const timestampSchema = z.number().int().positive();

const getTimestamp = async (
  url: URL | string,
  revalidate: number = TIME.ONE_HOUR_IN_SECONDS,
  tags?: string[]
) => {
  const { data, error, success } = await fetchTimestamp(url, revalidate, tags);

  if (!success) {
    console.error(error);
    return { data: null, error, success };
  }

  const safeParsedTS = timestampSchema
    .transform(val => val * TIME.ONE_SECOND_IN_MILLISECONDS)
    .safeParse(data);
  if (!safeParsedTS.success) {
    console.error(safeParsedTS.error);
    return { data: null, error: safeParsedTS.error, success: false };
  }
  return { data: safeParsedTS.data, error: null, success: true };
};

export const timestampsRouter = router({
  getAll: publicProcedure.query(async () => {
    const drPromise = getTimestamp(DOCTORS_TS_URL, TIME.ONE_HOUR_IN_SECONDS, [
      'doctors',
      'timestamp',
    ]);
    const instPromise = getTimestamp(
      INSTITUTIONS_TS_URL,
      TIME.ONE_HOUR_IN_SECONDS,
      ['institutions', 'timestamp']
    );

    const [doctors, institutions] = await Promise.all([drPromise, instPromise]);

    return { doctors, institutions };
  }),
  getDoctors: publicProcedure.query(async () => {
    return await getTimestamp(DOCTORS_TS_URL, TIME.ONE_HOUR_IN_SECONDS, [
      'doctors',
      'timestamp',
    ]);
  }),
  getInstitutions: publicProcedure.query(async () => {
    return await getTimestamp(INSTITUTIONS_TS_URL, TIME.ONE_HOUR_IN_SECONDS, [
      'institutions',
      'timestamp',
    ]);
  }),
});
