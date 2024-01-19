import { LatLngTuple } from 'leaflet';

import {
  DoctorsCsv,
  InstitutionsCsv,
  acceptsNewPatientsSchema,
  addressSchema,
  dateSchema,
  doctorCsvTypeSchema,
  emailSchema,
  extractDoctorCsvClinicSchema,
  institutionsCsvSchema,
  phoneSchema,
  stringToNumberSchema,
  urlSchema,
} from '@/lib/schemas';

import { toSlug } from './slugify';
import ValidationError from '../errors/ValidationError';

import type { InstitutionsMap } from './filters';

export function getInstitution(id: string, institutions: InstitutionsMap) {
  if (!institutions.has(id)) {
    throw new ValidationError({
      message: `Invalid institution ID: ${id}`,
      context: {
        inst_id: id,
        exitingInstIds: institutions.keys(),
      },
    });
  }

  const institution = institutions.get(id);
  const safeInstitution = institutionsCsvSchema.safeParse(institution);

  if (!safeInstitution.success) {
    throw new ValidationError({
      message: 'Invalid institution data',
      context: {
        key: id,
        institution,
        errors: safeInstitution.error,
      },
    });
  }

  return safeInstitution.data;
}

export function makeDoctorForWeb(
  doctor: DoctorsCsv,
  institution: InstitutionsCsv
) {
  const overides = {
    hasOveride:
      doctor.accepts_override ||
      doctor.availability_override ||
      doctor.note_override ||
      doctor.date_override,
    accepts: doctor.accepts_override,
    availability: doctor.availability_override,
    note: doctor.note_override,
    date: doctor.date_override,
  };

  try {
    const key = getFakeId(doctor);
    const href = getHref(doctor);
    const fullAddress = getAddress(doctor, institution)?.fullAddress;
    const type = getDoctorType(doctor);
    const acceptsNewPatients = acceptsNewPatientsSchema.parse(
      overides.accepts || doctor.accepts
    );
    const availability = getAvailability(doctor);
    const load = stringToNumberSchema.parse(doctor.load);
    const note = overides.note ? overides.note : null;
    const date = overides.date ? dateSchema.parse(overides.date) : null;
    const emails = doctor.email
      ? doctor.email.split(',').map(email => emailSchema.parse(email.trim()))
      : null;

    const phone = (doctor.phone || institution.phone)
      ?.trim()
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll('/', '')
      .replaceAll('(', '')
      .replaceAll(')', '');

    const phones = phone
      ? phone
          .split(',')
          .filter(Boolean)
          .map(phone => phoneSchema.parse(phone.trim()))
      : null;

    const website = (doctor.website || institution.website)?.trim();

    const websites = website
      .split(',')
      .filter(Boolean)
      .map(website => {
        const safe = urlSchema.safeParse(website.trim());
        if (safe.success) {
          return safe.data;
        }
        return new ValidationError({
          message: 'Invalid website',
          context: {
            website,
            error: safe.error,
            doctor: doctor.doctor,
            id_inst: doctor.id_inst,
          },
        });
      });

    return {
      key,
      acceptsNewPatients,
      href,
      type,
      name: doctor.doctor,
      institutionName: institution.name,
      address: fullAddress,
      geoLocation: getGeoLocation(doctor, institution),
      availability,
      load,
      note,
      date,
      emails,
      phones,
      websites: websites.length === 0 ? null : websites,
    } as const;
  } catch (error) {
    throw new ValidationError({
      message: 'Invalid doctor data',
      context: { doctor, institution, error },
    });
  }
}

export function getDoctor(doctor: DoctorsCsv, institutions: InstitutionsMap) {
  try {
    const institution = getInstitution(doctor.id_inst, institutions);
    return makeDoctorForWeb(doctor, institution);
  } catch (error) {
    console.log(error);
    return null;
  }
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

export function makeAddress(doctor: DoctorsCsv, institution: InstitutionsCsv) {
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

export function getAddress(doctor: DoctorsCsv, institution: InstitutionsCsv) {
  const address = makeAddress(doctor, institution);

  if (address instanceof ValidationError) {
    throw address;
  }

  return address;
}

export function getDoctorType(doctor: DoctorsCsv) {
  const safeType = doctorCsvTypeSchema.safeParse(doctor.type);
  if (safeType.success) {
    return safeType.data;
  }
  throw new ValidationError({
    message: `Invalid doctor type: ${doctor.type}`,
    context: { doctor, error: safeType.error },
  });
}

export function getGeoLocation(
  doctor: DoctorsCsv,
  institution?: InstitutionsCsv
) {
  const lat = parseFloat(doctor.lat) || parseFloat(institution?.lat ?? '');
  const lon = parseFloat(doctor.lon) || parseFloat(institution?.lon ?? '');

  if (isNaN(lat) || isNaN(lon)) {
    throw new ValidationError({
      message: 'Invalid geo location',
      context: { doctor, institution },
    });
  }

  return [lat, lon] as LatLngTuple;
}

export function getAvailability(doctor: DoctorsCsv) {
  const safeClinic = extractDoctorCsvClinicSchema.safeParse(doctor.type);

  if (safeClinic.success) {
    return -1;
  }

  const availability = parseFloat(
    doctor.availability_override
      ? doctor.availability_override
      : doctor.availability
  );

  if (isNaN(availability)) {
    throw new ValidationError({
      message: `Invalid availability: ${availability}`,
      context: { doctor },
    });
  }

  return availability;
}

export function isExtraOrFloatingClinic(doctorType: DoctorsCsv['type']) {
  const safeClinic = extractDoctorCsvClinicSchema.safeParse(doctorType);
  return safeClinic.success;
}
