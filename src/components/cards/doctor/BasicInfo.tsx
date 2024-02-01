import { DoctorClinicChip, DoctorTypeChip } from '@/components/chips';
import {
  DoctorTypeCsv,
  extractDoctorCsvBaseTypeSchema,
  extractDoctorCsvSubtypeSchema,
} from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import AddressItem from './AddressItem';
import Name from './Name';

export interface BasicInfoProps {
  name: string;
  address: string;
  href: string;
  institutionName: string;
  type: DoctorTypeCsv;
}

export default async function BasicInfo({
  name,
  address,
  href,
  institutionName,
  type,
}: BasicInfoProps) {
  const t = await getScopedI18n('doctor');

  const safeBaseType = extractDoctorCsvBaseTypeSchema.safeParse(type);
  const safeSubtype = extractDoctorCsvSubtypeSchema.safeParse(type);

  const translatedType = safeBaseType.success
    ? `, ${t(`type.${safeBaseType.data}.label`)}`
    : ('gp' as const);
  const translatedSubtype = safeSubtype.success
    ? `, ${t(`subtype.${safeSubtype.data}.label`)}`
    : '';

  return (
    <>
      <Name
        as='h2'
        href={href}
        name={name}
        nameSrOnly={`, ${institutionName}${translatedType}${translatedSubtype}`}
        translate='no'
        className=''
      />
      <div className='flex flex-wrap gap-2'>
        <DoctorTypeChip type={type} />
        <DoctorClinicChip type={type} />
      </div>
      <address
        className='cursor-help text-xs not-italic'
        translate='no'
        title={`${institutionName}, ${address}`}
      >
        <AddressItem variant='name' clamped text={institutionName} />
        <AddressItem variant='address' clamped text={address} />
      </address>
    </>
  );
}
