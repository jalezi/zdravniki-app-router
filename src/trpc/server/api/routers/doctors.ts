import { ValidationError } from '@/lib/errors';
import { doctorsQueryInputSchema } from '@/lib/schemas';
import {
  fetchAndParseDoctorsAndInstitutions,
  getSiteUrl,
  filters,
} from '@/lib/utils';

import { RouterOutputs } from '../..';
import { publicProcedure, router } from '../../trpc';

export const doctorsRouter = router({
  getPage: publicProcedure
    .input(
      doctorsQueryInputSchema.default({
        type: 'all',
        page: 1,
        pageSize: 12,
        accepts: 'all',
      })
    )
    .query(async ({ input }) => {
      const { data, errors, success } =
        await fetchAndParseDoctorsAndInstitutions();
      if (!data || !success || !data.doctors || !data.institutions) {
        return {
          data: null,
          error: new ValidationError({
            message: 'Could not fetch/parse doctors or institutions',
            context: { errors, data },
          }),
          success: false,
        } as const;
      }

      const { doctors, institutions } = data;
      const { type, page, pageSize: p, accepts } = input;

      const pageSize = Number(p);

      const { paginatedDoctors, uniqueInstitutions, total, end } =
        filters.getPaginatedDoctorsWithUniqueInstitutions(
          doctors,
          institutions,
          { ...input, pageSize }
        );

      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = end < total ? page + 1 : null;

      const createPageUrl = (_page: number | null) => {
        if (_page === null) {
          return null;
        }

        const url = new URL('api/trpc/doctors.getPage', getSiteUrl());
        url.searchParams.append(
          'input',
          JSON.stringify({ json: { type, accepts, page: _page, pageSize } })
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
    }),
});

export type DoctorsGetPageOutput = RouterOutputs['doctors']['getPage'];
