import Papa from 'papaparse';

import { DoctorsCsv, InstitutionsCsv } from '../schemas';

import type { ParseConfig, ParseMeta, ParseError } from 'papaparse';

export const PARSE_OPTIONS = {
  header: true,
  skipEmptyLines: true,
} as const;

export function parseCsv<T>(
  csv: string,
  options: ParseConfig = PARSE_OPTIONS
): { data: T[] | null; errors: ParseError[] | null; meta: ParseMeta } {
  const { data, errors, meta } = Papa.parse(csv, options);

  if (errors.length) {
    return { data: null, errors, meta };
  }

  return { data, errors: null, meta };
}

export const drCSVHeader = [
  'accepts',
  'accepts_override',
  'address',
  'availability',
  'availability_override',
  'city',
  'date_override',
  'doctor',
  'email',
  'id_inst',
  'lat',
  'load',
  'lon',
  'municipality',
  'municipalityPart',
  'note_override',
  'orderform',
  'phone',
  'post',
  'type',
  'website',
] as const;

export function parseDoctorsCsv(csv: string) {
  return parseCsv<DoctorsCsv>(csv);
}

export const instCSVHeader = [
  'address',
  'id_inst',
  'city',
  'lat',
  'lon',
  'municipality',
  'municipalityPart',
  'name',
  'phone',
  'post',
  'unit',
  'website',
  'zzzsSt',
] as const;

export function parseInstitutionsCsv(csv: string) {
  return parseCsv<InstitutionsCsv>(csv);
}
