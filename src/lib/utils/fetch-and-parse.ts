import { ParseError } from 'papaparse';

import { getDoctorsAndInstitutinsCsv } from './get-csv';
import { parseDoctorsCsv, parseInstitutionsCsv } from './parse-csv';
import ValidationError from '../errors/ValidationError';

export async function fetchAndParseDoctorsAndInstitutions(
  revalidate = 3600
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
    await getDoctorsAndInstitutinsCsv(revalidate);
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
