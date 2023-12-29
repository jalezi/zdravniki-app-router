import { z } from 'zod';

import ValidationError from '@/lib/errors/ValidationError';
import {
  doctorCsvTypeGpSchema,
  doctorCsvTypePedSchema,
  doctorTypeParamSchema,
} from '@/lib/schemas';
import { fetchAndParseDoctorsAndInstitutions, getSiteUrl } from '@/lib/utils';

import { RouterOutputs } from '../..';
import { publicProcedure, router } from '../../trpc';

const inputTypeSchema = doctorTypeParamSchema.or(z.enum(['all']));
const transformedGpSchema = doctorCsvTypeGpSchema.transform(() => 'gp');
const transformedPedSchema = doctorCsvTypePedSchema.transform(() => 'ped');
export const doctorsGetPageIntputSchema = z.object({
  type: inputTypeSchema.optional().default('all'),
  page: z.number().min(1).optional().default(1),
  pageSize: z.number().min(25).max(50).default(25),
});

export const doctorsRouter = router({
  getPage: publicProcedure
    .input(
      doctorsGetPageIntputSchema.default({ type: 'all', page: 1, pageSize: 25 })
    )
    .query(async ({ input }) => {
      const { data, errors } = await fetchAndParseDoctorsAndInstitutions();
      if (errors) {
        return { data: null, error: errors, success: false } as const;
      }

      if (data?.doctors && data?.institutions) {
        const { doctors, institutions } = data;
        const { type, page, pageSize } = input;

        const filteredDoctors =
          type === 'all'
            ? doctors
            : doctors.filter(doctor => {
                if (type === 'gp') {
                  return transformedGpSchema.safeParse(doctor.type).success;
                }

                if (type === 'ped') {
                  return transformedPedSchema.safeParse(doctor.type).success;
                }

                return doctor.type === type;
              });

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const paginatedDoctors = filteredDoctors.slice(start, end);
        const uniqueInstIds = new Set();
        for (const doctor of paginatedDoctors) {
          uniqueInstIds.add(doctor.id_inst);
        }

        const uniqueInstitutions = institutions.filter(inst =>
          uniqueInstIds.has(inst.id_inst)
        );

        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = end < filteredDoctors.length ? page + 1 : null;

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
            total: filteredDoctors.length,
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
