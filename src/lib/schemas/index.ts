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
  .refine(val => {
    try {
      new URL(val);
      return true;
    } catch (err) {
      if (val.startsWith('www.')) {
        try {
          new URL(`http://${val}`);
          return true;
        } catch (err) {
          return false;
        }
      }
    }

    return false;
  })
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
  accepts: trimmedStringSchema,
  accepts_override: trimmedStringSchema,
  address: trimmedStringSchema,
  availability: trimmedStringSchema,
  availability_override: trimmedStringSchema,
  city: trimmedStringSchema,
  date_override: trimmedStringSchema,
  doctor: trimmedStringSchema,
  email: trimmedStringSchema,
  id_inst: trimmedStringSchema,
  lat: trimmedStringSchema,
  load: trimmedStringSchema,
  lon: trimmedStringSchema,
  municipality: trimmedStringSchema,
  municipalityPart: trimmedStringSchema,
  note_override: trimmedStringSchema,
  orderform: trimmedStringSchema,
  phone: trimmedStringSchema,
  post: trimmedStringSchema,
  type: trimmedStringSchema,
  website: trimmedStringSchema,
});

export type DoctorsCsv = z.infer<typeof doctorsCsvSchema>;

export const institutionsCsvSchema = z.object({
  address: trimmedStringSchema,
  city: trimmedStringSchema,
  id_inst: trimmedStringSchema,
  lat: trimmedStringSchema,
  lon: trimmedStringSchema,
  municipality: trimmedStringSchema,
  municipalityPart: trimmedStringSchema,
  name: trimmedStringSchema,
  phone: trimmedStringSchema,
  post: trimmedStringSchema,
  unit: trimmedStringSchema,
  website: trimmedStringSchema,
  zzzsSt: trimmedStringSchema,
});

export type InstitutionsCsv = z.infer<typeof institutionsCsvSchema>;

const DEFAULT_DOCTOR_TYPE = 'all';
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 24;
export const ALLOWED_PAGE_SIZES = ['24', '48'] as const;

export const DEFAULT_SEARCH_PARAMS = {
  type: DEFAULT_DOCTOR_TYPE,
  page: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
} as const;

export const pageNumberSchema = z.number().int().positive();

export const pageSizeSchema = z
  .enum(ALLOWED_PAGE_SIZES)
  .or(z.number().min(24).max(24))
  .or(z.number().min(48).max(48))
  .refine(val => ALLOWED_PAGE_SIZES.includes(val.toString()), {
    message: 'Invalid page size',
  });

export const pageNumberAndSizeSchema = z.object({
  page: pageNumberSchema,
  pageSize: pageSizeSchema,
});

export const doctorsQueryInputSchema = z.object({
  type: filterDoctorTypeParamSchema.optional().default(DEFAULT_DOCTOR_TYPE),
  page: pageNumberSchema
    .optional()
    .default(DEFAULT_PAGE_NUMBER)
    .or(
      z.coerce.number().int().positive().optional().default(DEFAULT_PAGE_NUMBER)
    ),
  pageSize: pageSizeSchema.default(DEFAULT_PAGE_SIZE),
});

export const addressSchema = z
  .object({
    address: trimmedStringSchema,
    city: trimmedStringSchema,
    post: trimmedStringSchema,
    municipality: trimmedStringSchema,
    municipalityPart: trimmedStringSchema,
  })
  .transform(({ address, city, post, municipality, municipalityPart }, ctx) => {
    if (!post || !address)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Missing address or post',
      });

    const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

    return {
      street: address,
      city,
      post,
      postalCode: Number(postalCode),
      postalName: postalName.join(' '),
      municipality,
      municipalityPart,
      fullAddress: `${address}, ${post}`,
      searchAddress: `${address}, ${city} ${post} ${municipality} ${municipalityPart}`,
    };
  });
// .default({
//   address: '',
//   city: '',
//   post: '',
//   municipality: '',
//   municipalityPart: '',
// });

export type Address = z.infer<typeof addressSchema>;

export const acceptsNewPatientsSchema = z.enum(['y', 'n']);
export type AcceptsNewPatients = z.infer<typeof acceptsNewPatientsSchema>;

export const extractDoctorCsvBaseTypeSchema = doctorCsvTypeSchema.transform(
  (val, ctx) => {
    if (val.startsWith('gp')) {
      return 'gp' as const;
    }
    if (val.startsWith('den')) {
      return 'den' as const;
    }

    if (val.startsWith('ped')) {
      return 'ped' as const;
    }

    if (val.startsWith('gyn')) {
      return 'gyn' as const;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid type: ${val}`,
      params: { val },
      fatal: true,
    });

    return z.NEVER;
  }
);

export const extractDoctorCsvSubtypeSchema = doctorCsvTypeSchema.transform(
  (val, ctx) => {
    const safeType = doctorCsvTypeSchema.safeParse(val);

    if (!safeType.success) {
      safeType.error.issues.forEach(issue => {
        ctx.addIssue(issue);
      });
      return z.NEVER;
    }

    if (val.endsWith('-y')) {
      return 'y' as const;
    }

    if (val.endsWith('-s')) {
      return 's' as const;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid type: ${val}`,
      params: { val },
      fatal: true,
    });

    return z.NEVER;
  }
);

export const extractDoctorCsvClinicSchema = doctorCsvTypeSchema.transform(
  (val, ctx) => {
    if (val.endsWith('-f')) {
      return 'f' as const;
    }

    if (val.endsWith('-x')) {
      return 'x' as const;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid type: ${val}`,
      params: { val },
      fatal: true,
    });

    return z.NEVER;
  }
);

export const stringToNumberSchema = z.coerce.number();

function createArraySchema<T extends z.ZodTypeAny>(schema: T): z.ZodArray<T> {
  return z.array(schema);
}

export const emailSchema = z
  .string()
  .email()
  .or(
    z.instanceof(URL).refine(
      val => {
        if (val.protocol !== 'mailto:') {
          return false;
        }

        const email = val.pathname;
        const safeEmail = z.string().email().safeParse(email);
        if (safeEmail.success) {
          return true;
        }
        return false;
      },
      { message: 'Invalid email' }
    )
  )
  .transform(val => {
    if (typeof val === 'string') {
      return new URL(`mailto:${val}`);
    }
    return val;
  });
export const emailsSchema = createArraySchema(emailSchema);
export type Emails = z.infer<typeof emailsSchema>;

export const phoneRegex = /^\+?[\d()/\-\s]*$/;

export const phoneSchema = z
  .string()
  .regex(phoneRegex)
  .or(
    z.instanceof(URL).refine(
      val => {
        if (val.protocol !== 'tel:') {
          return false;
        }

        const phone = val.pathname;
        const safePhone = z.string().regex(phoneRegex).safeParse(phone);
        if (safePhone.success) {
          return true;
        }
        return false;
      },
      { message: 'Invalid phone' }
    )
  )
  .transform(val => {
    if (typeof val === 'string') {
      return new URL(`tel:${val}`);
    }
    return val;
  });

export const phonesSchema = createArraySchema(phoneSchema);
export type Phones = z.infer<typeof phonesSchema>;

const websiteProtocolSchema = z.enum(['http:', 'https:']);
export const websiteSchema = urlSchema.refine(
  val => {
    return websiteProtocolSchema.safeParse(val.protocol).success;
  },
  { message: 'Invalid website' }
);

export const websitesSchema = createArraySchema(urlSchema);

export type Websites = z.infer<typeof websitesSchema>;

export const dateSchema = z.coerce.date();
export type DateSchema = z.infer<typeof dateSchema>;
