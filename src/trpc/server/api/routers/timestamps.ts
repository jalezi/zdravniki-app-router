import { URL } from 'url';

import { z } from 'zod';

import { DOCTORS_TS_URL, INSTITUTIONS_TS_URL } from '@/lib/constants/url';
import { urlSchema } from '@/lib/schemas';

import { publicProcedure, router } from '../../trpc';

const timestampSchema = z.number().int().positive();

const MILLISECONDS_IN_A_SECOND = 1000;

const fetchTimestamp = async (url: URL | string) => {
  const safeUrl = urlSchema.safeParse(url);

  if (!safeUrl.success) {
    console.error(safeUrl.error);
    return { data: null, error: safeUrl.error, success: false };
  }

  const response = await fetch(safeUrl.data);
  if (!response.ok) {
    console.error(response.statusText);
    return { data: null, error: response.statusText, success: false };
  }
  const result = await response.json();

  const safeParsedTS = timestampSchema
    .transform(val => val * MILLISECONDS_IN_A_SECOND)
    .safeParse(result);
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
