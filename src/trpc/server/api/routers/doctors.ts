import ValidationError from '@/lib/errors/ValidationError';
import { doctorsQueryInputSchema } from '@/lib/schemas';
import {
  fetchAndParseDoctorsAndInstitutions,
  getSiteUrl,
  getStartAndEnd,
  filters,
} from '@/lib/utils';

import { RouterOutputs } from '../..';
import { publicProcedure, router } from '../../trpc';

export const doctorsRouter = router({
  getPage: publicProcedure
    .input(
      doctorsQueryInputSchema.default({ type: 'all', page: 1, pageSize: 25 })
    )
    .query(async ({ input }) => {
      const { data, errors } = await fetchAndParseDoctorsAndInstitutions();
      if (errors) {
        return { data: null, error: errors, success: false } as const;
      }

      if (data?.doctors && data?.institutions) {
        const { doctors, institutions } = data;
        const { type, page, pageSize } = input;

        const { paginatedDoctors, uniqueInstitutions, total } =
          filters.getPaginatedDoctorsWithUniqueInstitutions(
            doctors,
            institutions,
            input
          );

        const { end } = getStartAndEnd(page, pageSize);
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = end < total ? page + 1 : null;

        const createPageUrl = (_page: number | null) => {
          if (_page === null) {
            return null;
          }

          const url = new URL('api/trpc/doctors.getPage', getSiteUrl());
          url.searchParams.append(
            'input',
            JSON.stringify({ json: { type, page: _page, pageSize } })
          );

          return url.pathname + url.search;
        };

        const prev = createPageUrl(prevPage);
        const next = createPageUrl(nextPage);

        return {
          data: {
            doctors: paginatedDoctors,
            institutions: uniqueInstitutions,
            page,
            pageSize,
            prevPage: prev,
            nextPage: next,
            total,
          },
          error: null,
          success: true,
        } as const;
      }

      if (!data?.doctors) {
        return {
          data: null,
          error: new ValidationError({
            message: 'No doctors data!',
            context: { data, errors },
          }),
          success: false,
        } as const;
      }

      if (!data?.institutions) {
        return {
          data: null,
          error: new ValidationError({
            message: 'No institutions data!',
            context: { data, errors },
          }),
          success: false,
        } as const;
      }

      return {
        data: null,
        error: new ValidationError({
          message: 'Should not happen!',
          context: { data, errors },
        }),
        success: false,
      } as const;
    }),
});

export type DoctorsGetPageOutput = RouterOutputs['doctors']['getPage'];
