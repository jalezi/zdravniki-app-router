import { LatLngTuple } from 'leaflet';

import {
  DoctorsCsv,
  InstitutionsCsv,
  acceptsNewPatientsSchema,
  addressSchema,
  doctorCsvTypeSchema,
} from '@/lib/schemas';

import { toSlug } from './slugify';
import ValidationError from '../errors/ValidationError';

import type { InstitutionsMap } from './filters';

export function getDoctor(doctor: DoctorsCsv, institutions: InstitutionsMap) {
  const key = getFakeId(doctor);
  const href = getHref(doctor);
  const inst = institutions.get(doctor.id_inst);
  const institutionName = inst?.name;
  const fullAddress = getAddress(doctor, inst)?.fullAddress;
  const type = getDoctorType(doctor);
  const safeAcceptsNewPatients = acceptsNewPatientsSchema.safeParse(
    doctor.accepts_override ? doctor.accepts_override : doctor.accepts
  );
  const availability = getAvailability(doctor);

  const geoLocation = getGeoLocation(doctor, inst);

  if (
    !type ||
    !institutionName ||
    !fullAddress ||
    !safeAcceptsNewPatients.success ||
    !geoLocation ||
    availability === null
  ) {
    const context = {
      key,
      type: doctor.type,
      institutionName: inst?.name ? inst.name : 'No institution found',
      address: doctor.address || inst ? inst : 'No address found',
      accepts: safeAcceptsNewPatients.success
        ? safeAcceptsNewPatients.data
        : safeAcceptsNewPatients.error,
      geoLocation: {
        doctor: [doctor.lat, doctor.lon],
        institution: [inst?.lat, inst?.lon],
      },
      availability,
    };

    console.log(
      new ValidationError({
        message: 'Invalid doctor data',
        context,
      })
    );
    return null;
  }

  return {
    key,
    acceptsNewPatients: safeAcceptsNewPatients.data,
    href,
    type,
    name: doctor.doctor,
    institutionName,
    address: fullAddress,
    geoLocation,
    availability,
  } as const;
}

/**
 * Generates a fake ID for a doctor based on the provided data.
 * @param doctor - The doctor object.
 * @returns The generated fake ID.
 */
export function getFakeId(doctor: DoctorsCsv) {
  return getHref(doctor).slice(1, -1).replaceAll('/', '-');
}

export function getHref(doctor: DoctorsCsv) {
  return `/${doctor.type}/${toSlug(doctor.doctor)}/${doctor.id_inst}/`;
}

export function makeAddress(
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

export function getAddress(
  doctor: DoctorsCsv,
  institution?: InstitutionsCsv | null
) {
  const address = makeAddress(doctor, institution);

  if (address instanceof ValidationError) {
    return null;
  }

  return address;
}

export function getDoctorType(doctor: DoctorsCsv) {
  const safeType = doctorCsvTypeSchema.safeParse(doctor.type);
  if (safeType.success) {
    return safeType.data;
  }
  return null;
}

export function getGeoLocation(
  doctor: DoctorsCsv,
  institution?: InstitutionsCsv
) {
  const lat = parseFloat(doctor.lat) || parseFloat(institution?.lat ?? '');
  const lon = parseFloat(doctor.lon) || parseFloat(institution?.lon ?? '');

  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }

  return [lat, lon] as LatLngTuple;
}

export function getAvailability(doctor: DoctorsCsv) {
  const availability = parseFloat(
    doctor.availability_override
      ? doctor.availability_override
      : doctor.availability
  );

  if (isNaN(availability)) {
    return null;
  }

  return availability;
}
