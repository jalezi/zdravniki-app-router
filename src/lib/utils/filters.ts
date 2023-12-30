import { getStartAndEnd } from './pagination';
import {
  DoctorTypeCsv,
  DoctorsCsv,
  FilterDoctorTypeParam,
  InstitutionsCsv,
  doctorCsvTypeGpSchema,
  doctorCsvTypePedSchema,
} from '../schemas';

const transformedGpSchema = doctorCsvTypeGpSchema.transform(() => 'gp');
const transformedPedSchema = doctorCsvTypePedSchema.transform(() => 'ped');

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

  return doctors.filter(doctor => {
    const isType = byCanonicalType(doctor);

    return isType;
  });
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
  };
}
