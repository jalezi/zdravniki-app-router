import { getStartAndEnd } from './pagination';
import ValidationError from '../errors/ValidationError';
import {
  DoctorTypeCsv,
  DoctorsCsv,
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
  params: { type: FilterDoctorTypeParam }
) {
  if (params.type === 'all') {
    return doctors;
  }

  const { type } = params;

  const byCanonicalType = createByCanonicalType(type);

  return doctors.filter(doctor => byCanonicalType(doctor));
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

export function groupDoctorsByType(
  doctors: DoctorsCsv[]
): Map<FilterDoctorTypeParam, DoctorsCsv[]> {
  const groupedDoctors = new Map<FilterDoctorTypeParam, DoctorsCsv[]>();

  groupedDoctors.set('all', doctors);

  for (const doctor of doctors) {
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
  params: { type: FilterDoctorTypeParam; page: number; pageSize: number }
) {
  const { type, page, pageSize } = params;

  const filteredDoctors = filterDoctors(doctors, { type });

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
