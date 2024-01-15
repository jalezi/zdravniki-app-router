import { URL } from 'url';

import { z } from 'zod';

import { NEXT_FETCH_OPTIONS, TIME, URL as DATA_URL } from '@/lib/constants';
import { fetchTimestamp } from '@/lib/utils';

import { publicProcedure, router } from '../../trpc';

const timestampSchema = z.number().int().positive();

const doctorsTags = [
  NEXT_FETCH_OPTIONS.TAGS.DOCTORS,
  NEXT_FETCH_OPTIONS.TAGS.TIMESTAMP,
];

const institutionsTags = [
  NEXT_FETCH_OPTIONS.TAGS.INSTITUTIONS,
  NEXT_FETCH_OPTIONS.TAGS.TIMESTAMP,
];

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
    const drPromise = getTimestamp(
      DATA_URL.DOCTORS_TS_URL,
      TIME.ONE_HOUR_IN_SECONDS,
      doctorsTags
    );
    const instPromise = getTimestamp(
      DATA_URL.INSTITUTIONS_TS_URL,
      TIME.ONE_HOUR_IN_SECONDS,
      institutionsTags
    );

    const [doctors, institutions] = await Promise.all([drPromise, instPromise]);

    return { doctors, institutions };
  }),
  getDoctors: publicProcedure.query(async () => {
    return await getTimestamp(
      DATA_URL.DOCTORS_TS_URL,
      TIME.ONE_HOUR_IN_SECONDS,
      doctorsTags
    );
  }),
  getInstitutions: publicProcedure.query(async () => {
    return await getTimestamp(
      DATA_URL.INSTITUTIONS_TS_URL,
      TIME.ONE_HOUR_IN_SECONDS,
      institutionsTags
    );
  }),
});
