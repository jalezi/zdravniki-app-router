import { ParseError } from 'papaparse';

import { ValidationError } from '@/lib/errors';

import { fetchDoctorsAndInstitutinsCsv } from './fetch-csv';
import { parseDoctorsCsv, parseInstitutionsCsv } from './parse-csv';
import { TIME } from '../constants';

export async function fetchAndParseDoctorsAndInstitutions(
  revalidate = TIME.ONE_HOUR_IN_SECONDS
): Promise<
  | { data: null; errors: ValidationError[]; success: false }
  | { data: null; errors: ParseError[]; success: false }
  | {
      data: {
        doctors: ReturnType<typeof parseDoctorsCsv>['data'];
        institutions: ReturnType<typeof parseInstitutionsCsv>['data'];
      };
      errors: null;
      success: true;
    }
> {
  const { data, error, success } =
    await fetchDoctorsAndInstitutinsCsv(revalidate);
  if (success === false) {
    return { data, errors: [error], success };
  }

  const parsedInstitutions = parseInstitutionsCsv(data.institutions);
  const parsedDoctors = parseDoctorsCsv(data.doctors);
  const errors = [];

  if (parsedDoctors.errors && parsedDoctors.errors?.length > 0) {
    errors.push(parsedDoctors.errors);
  }
  if (parsedInstitutions.errors && parsedInstitutions.errors?.length > 0) {
    errors.push(parsedInstitutions.errors);
  }

  if (errors.length > 0) {
    return { data: null, errors: errors.flat(), success: false };
  }

  return {
    data: {
      doctors: parsedDoctors.data,
      institutions: parsedInstitutions.data,
    },
    errors: null,
    success: true,
  };
}
