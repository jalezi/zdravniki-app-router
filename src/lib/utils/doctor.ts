import { DoctorsCsv, InstitutionsCsv, addressSchema } from '@/lib/schemas';

import { toSlug } from './slugify';
import ValidationError from '../errors/ValidationError';

/**
 * Generates a fake ID for a doctor based on the provided data.
 * @param doctor - The doctor object.
 * @returns The generated fake ID.
 */
export function getFakeId(doctor: DoctorsCsv) {
  return getHref(doctor).replaceAll('/', '-');
}

export function getHref(doctor: DoctorsCsv) {
  return `/${doctor.type}/${toSlug(doctor.doctor)}/${doctor.id_inst}/`;
}

export function getAddress(
  doctor: DoctorsCsv,
  institution?: InstitutionsCsv | null
) {
  const doctorAddress = addressSchema.safeParse(doctor);

  if (doctorAddress.success) {
    return doctorAddress.data;
  }

  const institutionAddress = addressSchema.safeParse(institution);

  if (institutionAddress.success) {
    return institutionAddress.data;
  }

  const errors = [doctorAddress.error, institutionAddress.error].filter(
    Boolean
  );

  return new ValidationError({
    message: 'No address found',
    context: { doctor, institution, errors },
  });
}
