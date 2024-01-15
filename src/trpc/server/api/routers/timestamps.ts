import { URL } from 'url';

import { z } from 'zod';

import { TIME } from '@/lib/constants';
import { DOCTORS_TS_URL, INSTITUTIONS_TS_URL } from '@/lib/constants/url';
import { getTimestamp } from '@/lib/utils';

import { publicProcedure, router } from '../../trpc';

const timestampSchema = z.number().int().positive();

const fetchTimestamp = async (url: URL | string) => {
  const { data, error, success } = await getTimestamp(url);

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
    const drPromise = fetchTimestamp(DOCTORS_TS_URL);
    const instPromise = fetchTimestamp(INSTITUTIONS_TS_URL);

    const [doctors, institutions] = await Promise.all([drPromise, instPromise]);

    return { doctors, institutions };
  }),
  getDoctors: publicProcedure.query(async () => {
    return await fetchTimestamp(DOCTORS_TS_URL);
  }),
  getInstitutions: publicProcedure.query(async () => {
    return await fetchTimestamp(INSTITUTIONS_TS_URL);
  }),
});
