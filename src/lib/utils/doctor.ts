import { LatLngTuple } from 'leaflet';

import { BadDoctorError, ValidationError } from '@/lib/errors';
import {
  DoctorsCsv,
  InstitutionsCsv,
  acceptsNewPatientsSchema,
  addressSchema,
  dateSchema,
  doctorCsvTypeSchema,
  extractDoctorCsvClinicSchema,
  institutionsCsvSchema,
  stringToNumberSchema,
} from '@/lib/schemas';

import { toSlug } from './slugify';

import type { InstitutionsMap } from './filters';

export function getInstitution(id: string, institutions: InstitutionsMap) {
  if (!institutions.has(id)) {
    throw new BadDoctorError({
      message: `Institution with ID: ${id} does not exist`,
      context: {
        exitingInstIds: institutions.keys(),
      },
      properties: ['id_inst'],
      doctorInstId: id,
    });
  }

  const institution = institutions.get(id);
  const safeInstitution = institutionsCsvSchema.safeParse(institution);

  if (!safeInstitution.success) {
    throw new ValidationError({
      message: 'Invalid institution data',
      context: {
        id,
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
    hasOveride: !!doctor.date_override,
    accepts: doctor.accepts_override,
    availability: doctor.availability_override,
    note: doctor.note_override,
    date: doctor.date_override,
  };

  try {
    const addressObj = getAddress(doctor, institution);
    const load = stringToNumberSchema.parse(doctor.load);

    return {
      key: getFakeId(doctor),
      acceptsNewPatients: getAcceptsNewPatients(doctor),
      href: getHref(doctor),
      type: getDoctorType(doctor),
      name: doctor.doctor,
      institutionName: institution.name,
      address: addressObj.fullAddress,
      geoLocation: getGeoLocation(doctor, institution),
      availability: getAvailability(doctor),
      load,
      noteOverride: overides.note || null,
      dateOverride: overides.date ? dateSchema.parse(overides.date) : null,
      email: doctor.email,
      phone: doctor.phone || institution.phone,
      website: doctor.website || institution.website,
    } as const;
  } catch (error) {
    if (error instanceof BadDoctorError) {
      throw error;
    }

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
    console.warn(error);
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

export function getAddress(doctor: DoctorsCsv, institution: InstitutionsCsv) {
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

  throw new BadDoctorError({
    message: 'No address found',
    context: { errors },
    doctorId: getFakeId(doctor),
    doctorType: doctor.type,
    doctorInstId: doctor.id_inst,
    properties: ['address'],
  });
}

export function getDoctorType(doctor: DoctorsCsv) {
  const safeType = doctorCsvTypeSchema.safeParse(doctor.type);
  if (safeType.success) {
    return safeType.data;
  }
  throw new BadDoctorError({
    message: `Invalid doctor type: ${doctor.type}`,
    context: { error: safeType.error },
    doctorId: getFakeId(doctor),
    doctorType: doctor.type,
    doctorInstId: doctor.id_inst,
    properties: ['type'],
  });
}

export function getAcceptsNewPatients(doctor: DoctorsCsv) {
  const acceptsNewPatients = acceptsNewPatientsSchema.safeParse(
    doctor.accepts_override || doctor.accepts
  );

  if (acceptsNewPatients.success) {
    return acceptsNewPatients.data;
  }

  throw new BadDoctorError({
    message: `Invalid accepts: ${doctor.accepts}`,
    context: {
      error: acceptsNewPatients.error,
      accepts: doctor.accepts,
      accepts_override: doctor.accepts_override,
    },
    doctorId: getFakeId(doctor),
    doctorType: doctor.type,
    doctorInstId: doctor.id_inst,
    properties: ['accepts'],
  });
}

export function getGeoLocation(
  doctor: DoctorsCsv,
  institution?: InstitutionsCsv
) {
  const lat = parseFloat(doctor.lat) || parseFloat(institution?.lat ?? '');
  const lon = parseFloat(doctor.lon) || parseFloat(institution?.lon ?? '');

  if (isNaN(lat) || isNaN(lon)) {
    throw new BadDoctorError({
      message: 'Invalid geo location',
      context: {
        doctor: [doctor.lat, doctor.lon],
        institution: [institution?.lat, institution?.lon],
      },
      doctorId: getFakeId(doctor),
      doctorType: doctor.type,
      doctorInstId: doctor.id_inst,
      properties: ['lat', 'lon'],
    });
  }

  return [lat, lon] as LatLngTuple;
}

export function getAvailability(doctor: DoctorsCsv) {
  const safeClinic = extractDoctorCsvClinicSchema.safeParse(doctor.type);

  // extra and floating clinics have no availability
  if (safeClinic.success) {
    return -1;
  }

  const availability = parseFloat(
    doctor.availability_override
      ? doctor.availability_override
      : doctor.availability
  );

  if (isNaN(availability)) {
    throw new BadDoctorError({
      message: `Invalid availability: ${availability}`,
      context: {
        availability: doctor.availability,
        availability_override: doctor.availability_override,
      },
      doctorId: getFakeId(doctor),
      doctorType: doctor.type,
      doctorInstId: doctor.id_inst,
      properties: ['availability'],
    });
  }

  return availability;
}

export function isExtraOrFloatingClinic(doctorType: DoctorsCsv['type']) {
  const safeClinic = extractDoctorCsvClinicSchema.safeParse(doctorType);
  return safeClinic.success;
}

// const emails = doctor.email
//   ? doctor.email.split(',').map(email => emailSchema.parse(email.trim()))
//   : null;

// const phone = (doctor.phone || institution.phone)
//   ?.trim()
//   .replaceAll(' ', '')
//   .replaceAll('-', '')
//   .replaceAll('/', '')
//   .replaceAll('(', '')
//   .replaceAll(')', '');

// const phones = phone
//   ? phone
//       .split(',')
//       .filter(Boolean)
//       .map(phone => phoneSchema.parse(phone.trim()))
//   : null;

// const website = (doctor.website || institution.website)?.trim();

// const websites = website
//   .split(',')
//   .filter(Boolean)
//   .map(website => {
//     const safe = urlSchema.safeParse(website.trim());
//     if (safe.success) {
//       return safe.data;
//     }
//     return new ValidationError({
//       message: 'Invalid website',
//       context: {
//         website,
//         error: safe.error,
//         doctor: doctor.doctor,
//         id_inst: doctor.id_inst,
//       },
//     });
//   });
