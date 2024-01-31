import { ValidationError } from '@/lib/errors';

import { getAcceptsNewPatients } from './doctor';
import { getStartAndEnd } from './pagination';
import {
  DoctorTypeCsv,
  DoctorsCsv,
  FilterAcceptsParam,
  FilterDoctorTypeParam,
  InstitutionsCsv,
  doctorCsvTypeGpSchema,
  doctorCsvTypePedSchema,
  doctorCsvTypeSchema,
} from '../schemas';

const transformedGpSchema = doctorCsvTypeGpSchema.transform(
  () => 'gp' as const
);
const transformedPedSchema = doctorCsvTypePedSchema.transform(
  () => 'ped' as const
);

export const exhaustiveMatchGuard = (_: never) => {
  throw new ValidationError({ message: 'Should not have been here' });
};

const transformedDoctorCsvTypeSchema = doctorCsvTypeSchema.transform(val => {
  if (val.startsWith('gp')) {
    return transformedGpSchema.parse(val);
  }

  if (val.startsWith('ped')) {
    return transformedPedSchema.parse(val);
  }

  return val as Exclude<DoctorTypeCsv, 'gp-x' | 'gp-f' | 'ped-x'>;
});

export function createByCanonicalType(type: DoctorTypeCsv) {
  return (doctor: DoctorsCsv) => {
    if (type === 'gp') {
      return transformedGpSchema.safeParse(doctor.type).success;
    }

    if (type === 'ped') {
      return transformedPedSchema.safeParse(doctor.type).success;
    }

    return doctor.type === type;
  };
}

export function filterDoctors(
  doctors: DoctorsCsv[],
  params: { type: FilterDoctorTypeParam; accepts: FilterAcceptsParam }
) {
  if (params.type === 'all') {
    return doctors;
  }

  const { type, accepts } = params;

  const byCanonicalType = createByCanonicalType(type);

  return doctors.filter(
    doctor =>
      byCanonicalType(doctor) && getAcceptsNewPatients(doctor) === accepts
  );
}

export function getUniqueInstitutions(doctors: DoctorsCsv[]) {
  const uniqueInstIds = new Set<string>();
  for (const doctor of doctors) {
    uniqueInstIds.add(doctor.id_inst);
  }

  return uniqueInstIds;
}

export function getInstitutionsMap(
  doctors: DoctorsCsv[],
  institutions: InstitutionsCsv[]
) {
  const uniqueInstIds = getUniqueInstitutions(doctors);

  const uniqueInstitutions = new Map<string, InstitutionsCsv>();
  for (const id of uniqueInstIds) {
    const inst = institutions.find(inst => inst.id_inst === id);
    if (inst) {
      uniqueInstitutions.set(id, inst);
    }
  }

  return uniqueInstitutions;
}

export type InstitutionsMap = ReturnType<typeof getInstitutionsMap>;

export function groupDoctorsByType(
  doctors: DoctorsCsv[],
  filters: { accepts: FilterAcceptsParam } = { accepts: 'all' }
): Map<FilterDoctorTypeParam, DoctorsCsv[]> {
  const groupedDoctors = new Map<FilterDoctorTypeParam, DoctorsCsv[]>();

  const filteredDoctors = doctors.filter(
    doctor =>
      filters.accepts === 'all' ||
      getAcceptsNewPatients(doctor) === filters.accepts
  );

  groupedDoctors.set('all', filteredDoctors);

  for (const doctor of filteredDoctors) {
    const safeParsedType = transformedDoctorCsvTypeSchema.safeParse(
      doctor.type
    );

    if (!safeParsedType.success) {
      const error = new ValidationError({
        message: `Invalid doctor type: ${doctor.type}`,
        context: { doctor, error: safeParsedType.error },
      });
      console.error(error);
      continue;
    }

    const type = safeParsedType.data;

    if (!groupedDoctors.has(type)) {
      groupedDoctors.set(type, []);
    }

    groupedDoctors.get(type)?.push(doctor);
  }

  return groupedDoctors;
}

export function getPaginatedDoctorsWithUniqueInstitutions(
  doctors: DoctorsCsv[],
  institutions: InstitutionsCsv[],
  params: {
    type: FilterDoctorTypeParam;
    page: number;
    pageSize: number;
    accepts: FilterAcceptsParam;
  }
) {
  const { type, page, pageSize, accepts } = params;

  const filteredDoctors = filterDoctors(doctors, { type, accepts });

  const uniqueInstitutions = getInstitutionsMap(filteredDoctors, institutions);

  const { start, end } = getStartAndEnd(page, pageSize);

  const paginatedDoctors = filteredDoctors.slice(start, end);

  return {
    paginatedDoctors,
    uniqueInstitutions,
    total: filteredDoctors.length,
    start,
    end,
  };
}
