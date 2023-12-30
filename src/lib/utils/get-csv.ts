import { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } from '../constants/url';
import HTTPError from '../errors/HTTPError';
import ValidationError from '../errors/ValidationError';
import { urlCsvSchema } from '../schemas';

export const getCsv = async (
  url: string | URL,
  revalidate: number = 3600
): Promise<
  | { data: string; error: null; success: true }
  | { data: null; error: HTTPError; success: false }
> => {
  const safeUrl = urlCsvSchema.safeParse(url);

  if (safeUrl.success) {
    const csv = await fetch(safeUrl.data, { next: { revalidate } });
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

export const getDoctorsAndInstitutinsCsv = async (
  revalidate: number = 3600
): Promise<
  | {
      data: { doctors: string; institutions: string };
      error: null;
      success: true;
    }
  | { data: null; error: ValidationError; success: false }
> => {
  const promises = [
    getCsv(DOCTORS_CSV_URL, revalidate),
    getCsv(INSTITUTIONS_CSV_URL, revalidate),
  ];

  const [doctors, institutions] = await Promise.all(promises);

  if (doctors?.data && institutions?.data) {
    return {
      data: { doctors: doctors.data, institutions: institutions.data },
      error: null,
      success: true,
    };
  }

  return {
    data: null,
    error: new ValidationError({
      message: 'Something went wrong during fetching CSVs',
      context: { doctors, institutions },
    }),
    success: false,
  };
};
