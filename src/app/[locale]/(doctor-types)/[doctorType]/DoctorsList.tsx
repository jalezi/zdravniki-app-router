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

import { defaultsSearchParamsSchema } from '../../utils';

export interface DoctorsListProps {
  accepts: string;
  type: string;
  page: number | string;
  pageSize: number | string;
}

const DoctorsList = async function DoctorsList({
  type,
  page,
  pageSize,
  accepts,
}: DoctorsListProps) {
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
    // it should never happen; handled in middleware
    throw new ValidationError({
      message:
        'Invalid search params. It should never happened while it is supposed to be handled in middleware',
    });
  }

  const parsedSearchParams = parsedParams.data;

  const doctorGroupsByType = groupAndFilterDoctorsByType(doctors, {
    accepts: parsedSearchParams.accepts,
  });
  const doctorsByType = doctorGroupsByType.get(parsedSearchParams.type) ?? [];

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
      <li key={key} className='place-self-stretch'>
        <DoctorCard {...drProps} />
      </li>
    );
  });
};

export default DoctorsList;
