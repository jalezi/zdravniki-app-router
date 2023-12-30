import { z } from 'zod';

export const timestampSchema = z
  .number()
  .int()
  .positive()
  .or(z.string())
  .refine(
    value => {
      return new Date(value).toString() !== 'Invalid Date';
    },
    { message: 'Invalid date' }
  );
export type Timestamp = z.infer<typeof timestampSchema>;

export const urlSchema = z
  .string()
  .url()
  .or(z.instanceof(URL))
  .transform(url => {
    return typeof url === 'string' ? new URL(url) : url;
  });

export const urlCsvSchema = urlSchema.refine(
  val => val.pathname?.endsWith('.csv'),
  { message: 'URL must end with .csv' }
);

export const doctorTypeParamSchema = z.enum([
  'gp',
  'gyn',
  'ped',
  'den',
  'den-s',
  'den-y',
]);

export type DoctorTypeParam = z.infer<typeof doctorTypeParamSchema>;

export const doctorCsvTypeGpSchema = z.enum(['gp', 'gp-x', 'gp-f']);

export const doctorCsvTypePedSchema = z.enum(['ped', 'ped-x']);

export const doctorCsvTypeDenSchema = z.enum(['den', 'den-y', 'den-s']);

export const doctorCsvTypeGynSchema = z.enum(['gyn']);

export const doctorCsvTypeSchema = z.union([
  doctorCsvTypeGpSchema,
  doctorCsvTypePedSchema,
  doctorCsvTypeDenSchema,
  doctorCsvTypeGynSchema,
]);

export type DoctorTypeCsv = z.infer<typeof doctorCsvTypeSchema>;

export const filterDoctorTypeParamSchema = doctorTypeParamSchema.or(
  z.enum(['all'])
);

export type FilterDoctorTypeParam = z.infer<typeof filterDoctorTypeParamSchema>;

export const trimmedStringSchema = z
  .string()
  .transform(s => s.replace(/\s+/g, ' ').trim());

export const doctorsCsvSchema = z.object({
  accepts: z.string(),
  accepts_override: z.string(),
  address: z.string(),
  availability: z.string(),
  availability_override: z.string(),
  city: z.string(),
  date_override: z.string(),
  doctor: z.string(),
  email: z.string(),
  id_inst: z.string(),
  lat: z.string(),
  load: z.string(),
  lon: z.string(),
  municipality: z.string(),
  municipalityPart: z.string(),
  note_override: z.string(),
  orderform: z.string(),
  phone: z.string(),
  post: z.string(),
  type: z.string(),
  website: z.string(),
});

export type DoctorsCsv = z.infer<typeof doctorsCsvSchema>;

export const institutionsCsvSchema = z.object({
  address: z.string(),
  city: z.string(),
  id_inst: z.string(),
  lat: z.string(),
  lon: z.string(),
  municipality: z.string(),
  municipalityPart: z.string(),
  name: z.string(),
  phone: z.string(),
  post: z.string(),
  unit: z.string(),
  website: z.string(),
  zzzsSt: z.string(),
});

export type InstitutionsCsv = z.infer<typeof institutionsCsvSchema>;

export const pageNumberSchema = z.number().int().positive();

export const pageSizeSchema = z.number().int().positive();

export const pageNumberAndSizeSchema = z.object({
  page: pageNumberSchema,
  pageSize: pageSizeSchema,
});

export const doctorsQueryInputSchema = z.object({
  type: filterDoctorTypeParamSchema.optional().default('all'),
  page: pageNumberSchema.optional().default(1),
  pageSize: pageSizeSchema.min(25).max(50).default(25),
});
