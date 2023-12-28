import ValidationError from './errors/ValidationError';
import { getDoctorsAndInstitutinsCsv } from './get-csv';
import {
  parseDoctorsCsv as parseDoctorsCsv,
  parseInstitutionsCsv as parseInstitutionsCsv,
} from './parse-csv';

export async function fetchAndParseDoctorsAndInstitutions(revalidate = 3600) {
  const { data, error } = await getDoctorsAndInstitutinsCsv(revalidate);
  if (error) {
    return { data: null, errors: [error] };
  }

  if (!data) {
    return {
      data: null,
      errors: [
        new ValidationError({
          message:
            'Data does not exist. Something went terribly wrong during fetching CSVs',
        }),
      ],
    };
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
  return {
    data: {
      doctors: parsedDoctors.data,
      institutions: parsedInstitutions.data,
    },
    errors: errors.length > 0 ? errors.flat() : null,
  };
}
