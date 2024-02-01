import { DoctorCard } from '@/components/cards';
import { ValidationError } from '@/lib/errors';
import { doctorsCsvSchema } from '@/lib/schemas';
import {
  doctorUtils,
  fetchAndParseDoctorsAndInstitutions,
  getStartAndEnd,
} from '@/lib/utils';
import {
  getInstitutionsMap,
  groupAndFilterDoctorsByType,
} from '@/lib/utils/filters';
import { getCurrentLocale } from '@/locales/server';

import {
  defaultsSearchParamsSchema,
  redirectWithSearchParams,
} from '../../utils';

export interface DoctorCardProps {
  accepts: string;
  type: string;
  page: string;
  pageSize: string;
}

const DoctorsList = async function DoctorsList({
  type,
  page,
  pageSize,
  accepts,
}: DoctorCardProps) {
  const locale = getCurrentLocale();

  const { data, errors, success } = await fetchAndParseDoctorsAndInstitutions();

  if (!success || !data || !data.doctors || !data.institutions) {
    // todo - handle errors or at least better explanation
    console.log(errors);
    throw new Error('Failed to fetch doctors and institutions');
  }

  const { doctors, institutions } = data;

  const parsedParams = defaultsSearchParamsSchema.safeParse({
    type,
    page,
    pageSize,
    accepts,
  });

  if (!parsedParams.success) {
    const error = new ValidationError({
      message: 'Invalid params',
      context: {
        type,
        accepts,
        page,
        pageSize,
      },
    });
    console.log(error);
    console.log('Redirecting to first page with default params');

    redirectWithSearchParams(defaultsSearchParamsSchema.parse({}), locale);
    return null;
  }

  const parsedSearchParams = parsedParams.data;

  const doctorGroupsByType = groupAndFilterDoctorsByType(doctors, {
    accepts: parsedSearchParams.accepts,
  });
  const doctorsByType = doctorGroupsByType.get(parsedSearchParams.type) ?? [];

  const length = doctorsByType.length;
  const maxPage = Math.floor(length / +parsedSearchParams.pageSize) + 1;

  if (+parsedSearchParams.page > maxPage) {
    const error = new ValidationError({
      message: "Page doesn't exist",
      context: {
        page: {
          maxPage,
          ...parsedSearchParams,
        },
      },
    });
    console.log(error);
    console.log('Redirecting to last page');
    parsedSearchParams.page = maxPage;

    redirectWithSearchParams(parsedSearchParams, locale);
    return null;
  }

  const { start, end } = getStartAndEnd(
    parsedSearchParams.page,
    +parsedSearchParams.pageSize
  );

  const paginatedDoctors = doctorsByType.slice(start, end);
  const uniqueInstitutions = getInstitutionsMap(paginatedDoctors, institutions);

  return paginatedDoctors.map(doctor => {
    const safeDoctor = doctorsCsvSchema.safeParse(doctor);

    if (!safeDoctor.success) {
      return null;
    }

    const props = doctorUtils.getDoctor(safeDoctor.data, uniqueInstitutions);

    if (!props) {
      return null; // TODO handle this later
    }

    const { key, ...drProps } = props;

    return (
      <li key={key}>
        <DoctorCard {...drProps} />
      </li>
    );
  });
};

export default DoctorsList;
