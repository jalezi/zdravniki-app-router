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

export const doctorTypeParamSchema = z.enum([
  'gp',
  'gyn',
  'ped',
  'den',
  'den-s',
  'den-y',
]);

export type DrTypeParam = z.infer<typeof doctorTypeParamSchema>;
