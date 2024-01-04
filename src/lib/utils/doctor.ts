import { DoctorsCsv } from '@/lib/schemas';

import { toSlug } from './slugify';

/**
 * Generates a fake ID for a doctor based on the provided data.
 * @param doctor - The doctor object.
 * @returns The generated fake ID.
 */
export function getDoctorFakeId(doctor: DoctorsCsv): string {
  return `${doctor.type}-${toSlug(doctor.doctor)}-${doctor.id_inst}`;
}
