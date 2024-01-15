import { TIME } from '../constants';
import { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } from '../constants/url';
import HTTPError from '../errors/HTTPError';
import ValidationError from '../errors/ValidationError';
import { urlCsvSchema } from '../schemas';

export const fetchCsv = async (
  url: string | URL,
  revalidate: number = TIME.ONE_HOUR_IN_SECONDS,
  tags?: string[]
): Promise<
  | { data: string; error: null; success: true }
  | { data: null; error: HTTPError; success: false }
> => {
  const safeUrl = urlCsvSchema.safeParse(url);

  if (safeUrl.success) {
    const csv = await fetch(safeUrl.data, { next: { revalidate, tags } });
    if (csv.ok) {
      return { data: await csv.text(), error: null, success: true };
    }

    return {
      data: null,
      error: new HTTPError({
        message: 'Could not fetch CSV',
        code: csv.status,
        context: { error: csv.statusText, url, status: csv.status },
      }),
      success: false,
    };
  }

  throw new ValidationError({
    message: `Invalid URL\n${safeUrl.error.message}`,
    context: { url, ...safeUrl.error },
  });
};

export const fetchDoctorsAndInstitutinsCsv = async (
  revalidate: number = TIME.ONE_HOUR_IN_SECONDS
): Promise<
  | {
      data: { doctors: string; institutions: string };
      error: null;
      success: true;
    }
  | { data: null; error: ValidationError; success: false }
> => {
  const promises = [
    fetchCsv(DOCTORS_CSV_URL, revalidate, ['doctors', 'csv']),
    fetchCsv(INSTITUTIONS_CSV_URL, revalidate, ['institutions', 'csv']),
  ];

  const [doctors, institutions] = await Promise.all(promises);

  if (!doctors || !institutions || !doctors.success || !institutions.success) {
    return {
      data: null,
      error: new ValidationError({
        message: 'Something went wrong during fetching CSVs',
        context: {
          doctors,
          institutions,
          errors: [doctors?.error, institutions?.error].filter(Boolean),
        },
      }),
      success: false,
    };
  }

  return {
    data: { doctors: doctors.data, institutions: institutions.data },
    error: null,
    success: true,
  };
};
